import { Kafka } from "kafkajs";
import * as dotenv from "dotenv";

dotenv.config();

const settings = {
  kafkaTopicName: process.env.KAFKA_TOPIC_NAME!,
  kafkaClientId: process.env.KAFKA_CLIENT_ID!,
  kafkaGroupId: process.env.KAFKA_GROUP_ID!,
  kafkaBrokers: process.env.KAFKA_BROKERS!.split(","),
};

console.log({ settings });

/**
 * kafkajs
 */
const kafka = new Kafka({
  clientId: settings.kafkaClientId,
  brokers: settings.kafkaBrokers,
});

const consumer = kafka.consumer({ groupId: settings.kafkaGroupId });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: settings.kafkaTopicName,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString("utf-8");
      if (!value) {
        console.warn("No value");
        return;
      }
      const json = JSON.parse(value);
      const afterData = json.after;
      if (!afterData) {
        console.warn("No after data");
        return;
      }
      console.log({ afterData });
    },
  });
};

run().catch(console.error);

// const showInfo = async () => {
//   const admin = kafka.admin();
//   await admin.connect();
//   const topics = await admin.listTopics();
//   console.log({ topics });
// };
// showInfo().catch(console.error);

/**
 * kafkajs producer
 */
// const sendMessage = async () => {
//   const producer = kafka.producer();
//   await producer.connect();
//   await producer.send({
//     topic: settings.kafkaTopicName,
//     messages: [{ value: "Hello KafkaJS user!" }],
//   });
// };

// sendMessage().catch(console.error);
