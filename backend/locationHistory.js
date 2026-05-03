// In-memory location history simulation
// In production, replace with actual DB writes (PostgreSQL, MongoDB, etc.)
// We intentionally do NOT write to DB on every socket event.
// The DB consumer batches/processes asynchronously via Kafka.

const locationHistory = {};

function saveLocation(event) {
  const { userId, lat, lng, timestamp } = event;
  if (!locationHistory[userId]) {
    locationHistory[userId] = [];
  }
  locationHistory[userId].push({ lat, lng, timestamp });

  // Keep only last 100 entries per user to avoid memory bloat
  if (locationHistory[userId].length > 100) {
    locationHistory[userId].shift();
  }
}

function getHistory(userId) {
  return locationHistory[userId] || [];
}

module.exports = { saveLocation, getHistory };
