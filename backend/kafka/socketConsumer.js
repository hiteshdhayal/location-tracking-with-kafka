const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'socket-consumer',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'socket-broadcast-group' });

async function startSocketConsumer(io) {
  await consumer.connect();
  await consumer.subscribe({ topic: 'location-updates', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log('[SocketConsumer] Broadcasting location for:', event.userId);
        io.emit('location-update', event);
      } catch (err) {
        console.error('[SocketConsumer] Error processing message:', err.message);
      }
    },
  });
}

module.exports = { startSocketConsumer };
