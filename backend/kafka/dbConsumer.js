const { Kafka } = require('kafkajs');
const { saveLocation } = require('../locationHistory');

const kafka = new Kafka({
  clientId: 'db-consumer',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'db-processor-group' });

async function startDbConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'location-updates', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        saveLocation(event);
        console.log('[DBConsumer] Location saved for:', event.userId);
      } catch (err) {
        console.error('[DBConsumer] Error:', err.message);
      }
    },
  });
}

module.exports = { startDbConsumer };
