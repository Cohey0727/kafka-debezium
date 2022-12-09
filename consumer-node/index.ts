import { Kafka } from "kafkajs";
import * as dotenv from "dotenv";
import kafkaNode from "kafka-node";

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
      console.log({ topic, partition, message });
    },
  });
};

run().catch(console.error);

const showInfo = async () => {
  const admin = kafka.admin();
  await admin.connect();
  const topics = await admin.listTopics();
  console.log({ topics });
};

showInfo().catch(console.error);

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

/**
 * kafka-node
 */
// const Consumer = kafkaNode.Consumer;
// const client = new kafkaNode.KafkaClient({ kafkaHost: settings.kafkaBrokers[0] });
// const consumer = new Consumer(client, [{ topic: settings.kafkaTopicName }], {
//   groupId: settings.kafkaGroupId,
//   autoCommit: true,
//   fromOffset: true,
// });

// consumer.on("message", (message) => {
//   console.log({ message });
// });

// consumer.on("error", function (error) {
//   console.log({ error });
// });

// consumer.on("message", (message) => {
//   console.log({ message });
// });
