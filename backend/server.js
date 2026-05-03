require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const cors = require('cors');
const passport = require('./auth/passport');
const { connectProducer, publishLocation } = require('./kafka/producer');
const { startSocketConsumer } = require('./kafka/socketConsumer');
const { startDbConsumer } = require('./kafka/dbConsumer');
const { getHistory } = require('./locationHistory');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173');
  }
);

app.get('/auth/me', (req, res) => {
  res.json(req.user || null);
});

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

app.get('/history/:userId', (req, res) => {
  const history = getHistory(req.params.userId);
  res.json(history);
});

// Track connected users: socketId -> user info
const connectedUsers = {};

// Socket.IO — tie socket connection to authenticated user via session
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
})));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('Unauthorized socket connection'));
  }
});

io.on('connection', (socket) => {
  const user = socket.request.user;
  console.log(`[Socket] Connected: ${user.name} (${socket.id})`);

  connectedUsers[socket.id] = {
    socketId: socket.id,
    userId: user.id,
    name: user.name,
    photo: user.photo,
  };

  socket.on('send-location', async (data) => {
    const { lat, lng } = data;

    // Validate
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.warn('[Socket] Invalid location data from', user.id);
      return;
    }

    const locationEvent = {
      userId: user.id,
      name: user.name,
      photo: user.photo,
      lat,
      lng,
      timestamp: new Date().toISOString(),
    };

    try {
      await publishLocation(locationEvent);
    } catch (err) {
      console.error('[Socket] Kafka publish error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${user.name}`);
    delete connectedUsers[socket.id];
    io.emit('user-disconnected', { userId: user.id });
  });
});

async function start() {
  await connectProducer();
  await startSocketConsumer(io);
  await startDbConsumer();

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
}

start().catch(console.error);
