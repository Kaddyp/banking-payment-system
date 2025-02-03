import { Kafka } from "kafkajs";
import 'dotenv/config';

const kafka = new Kafka({
  clientId: "transaction-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  retry: {
      retries: 10,
      initialRetryTime: 300,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "transaction-group" });

export const connectKafka = async () => {
    try {
        await producer.connect();
        await consumer.connect();
        console.log('Kafka producer connected');
    } catch (error) {
        console.error('Failed to connect Kafka producer:', error);
        throw error;
    }
};