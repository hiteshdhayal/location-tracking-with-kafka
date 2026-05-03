# Live Location Tracker

## Project Overview

A real-time location tracking web application where users can log in via Google OAuth 2.0 and share their live GPS location. All connected users can see each other on an interactive map. Location events are published to Apache Kafka by the backend, which processes and broadcasts these real-time updates via Socket.IO.

## Tech Stack

**Backend**:
- Node.js + Express
- Socket.IO
- KafkaJS (Kafka client)
- Passport.js with passport-google-oauth20
- express-session

**Frontend**:
- React (Vite)
- Socket.IO client
- Leaflet + react-leaflet
- Axios

**Infrastructure**:
- Kafka + Zookeeper via Docker Compose

## Setup Steps

1. **Clone the repository** (if applicable) and navigate to the root directory.
2. **Start Kafka infrastructure**:
   ```bash
   docker-compose up -d
   ```
3. **Configure Environment Variables**:
   Copy `.env.example` to the root and respective directories and fill in the values, especially your Google Client ID and Secret.
4. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
5. **Start the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

Root `.env.example` contains settings for both backend and frontend. Note that you should create `backend/.env` and `frontend/.env` based on this:

**Backend**:
- `PORT=4000`: Backend server port.
- `GOOGLE_CLIENT_ID`: Your Google OAuth 2.0 Client ID.
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth 2.0 Client Secret.
- `SESSION_SECRET`: Secret string to encrypt session data.
- `CALLBACK_URL`: OAuth callback (e.g., `http://localhost:4000/auth/google/callback`).
- `FRONTEND_URL`: URL of the React app (e.g., `http://localhost:5173`).
- `KAFKA_BROKER`: Kafka broker address (e.g., `localhost:9092`).

**Frontend**:
- `VITE_BACKEND_URL`: URL of your Node.js backend (e.g., `http://localhost:4000`).

## OIDC Auth Setup

To set up Google OAuth:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**.
5. Choose **Web application**.
6. Under **Authorized JavaScript origins**, add `http://localhost:5173`.
7. Under **Authorized redirect URIs**, add `http://localhost:4000/auth/google/callback`.
8. Copy the **Client ID** and **Client Secret** into your `.env` file.

## Socket Event Flow

- Client periodically reads location via `navigator.geolocation` and emits a `send-location` event.
- Backend server receives this event and publishes a location payload to the Kafka topic.
- A background consumer (`socketConsumer`) reads this from Kafka and emits a `location-update` event to all connected clients.
- Frontend React component updates the state and places markers on the Leaflet map.
- When a user disconnects, the server emits a `user-disconnected` event to remove their marker from the map.

## Kafka Event Flow

- **Topic**: `location-updates`
- **Producer**: Embedded in `server.js` (`kafka/producer.js`) to publish every location update.
- **Consumer Group 1 (`socket-broadcast-group`)**: Listens to the topic and broadcasts via Socket.IO for real-time map updates.
- **Consumer Group 2 (`db-processor-group`)**: Listens to the same topic and processes updates to persist a user's location history (using in-memory simulated DB in this demo).

## Assumptions & Limitations

- **Simulated DB**: Location history is maintained in-memory. In a production scenario, you would connect this to PostgreSQL or MongoDB.
- **Single Broker**: Only one Kafka broker is used without replication for local development simplicity.
- **In-Memory Sessions**: Express sessions use the default in-memory store. For a scalable app, replace with Redis (`connect-redis`).
- **No Rate Limiting**: The backend accepts location events at any rate without throttling.
- **Location Refresh**: The browser is polled every 5 seconds using `setInterval` + `getCurrentPosition` for simplicity over continuous `watchPosition`.

## Demo Video

*[Demo video link placeholder]*
