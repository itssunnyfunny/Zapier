
import { Kafka } from "kafkajs";
import { PrismaClient } from "./generated/prisma";



const client = new PrismaClient();

// Kafka client configuration
const kafka = new Kafka({
    clientId: "outbox-processor", 
    brokers: ["localhost:9092"],    
})

async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while (true) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where:{},
            take: 10,
    })
}

}
main()