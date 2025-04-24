import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "outbox-processor",    
    brokers: ["localhost:9092"], 
});

const TOPIC_NAME = "zap-event"; 
async function main() {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true }); 
    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            }); 
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: message.offset,
            }
      
        ]);
     
        },
    });
}

main().catch(console.error);