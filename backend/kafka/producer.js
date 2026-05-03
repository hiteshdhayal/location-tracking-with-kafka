const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'location-producer',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('[Kafka] Producer connected');
}

async function publishLocation(locationEvent) {
  await producer.send({
    topic: 'location-updates',
    messages: [
      {
        key: locationEvent.userId,
        value: JSON.stringify(locationEvent),
      },
    ],
  });
}

module.exports = { connectProducer, publishLocation };
