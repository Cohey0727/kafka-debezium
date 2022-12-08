import { Kafka } from "kafkajs";
import * as dotenv from "dotenv";

dotenv.config();

const settings = {
  topicName: process.env.KAFKA_TOPIC_NAME!,
  kafkaClientId: process.env.KAFKA_CLIENT_ID!,
  kafkaGroupId: process.env.KAFKA_GROUP_ID!,
  kafkaBrokers: process.env.KAFKA_BROKERS!.split(","),
};

console.log({ settings });

const kafka = new Kafka({
  clientId: settings.kafkaClientId,
  brokers: settings.kafkaBrokers,
});

const consumer = kafka.consumer({ groupId: settings.kafkaGroupId });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: settings.topicName, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, partition, message });
    },
  });
};

run().catch(console.error);
