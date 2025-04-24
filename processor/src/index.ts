
import { Kafka } from "kafkajs";
import { PrismaClient } from "./generated/prisma";



const client = new PrismaClient();

// Kafka client configuration
const kafka = new Kafka({
    clientId: "outbox-processor", 
    brokers: ["localhost:9092"],    
})
const TOPIC_NAME = "zap-event";

async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while (true) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where:{},
            take: 10,
    })

    producer.send({
        topic: TOPIC_NAME,    
        messages: pendingRows.map( r => {
            return {
                value: r.zapRunId
            }
        })
    })
    
    await client.zapRunOutbox.deleteMany({
        where: {
            id: {
                in: pendingRows.map(r => r.id)
            }
        }
    })
}

}
main()