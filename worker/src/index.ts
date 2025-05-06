import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "outbox-processor",     
    brokers: ["localhost:9092"],  
});

const TOPIC_NAME = "zap-event"; 
async function main() {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();
    console.log("Connected to Kafka consumer");
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
                offset: (parseInt(message.offset) + 1).toString(), // Commit the offset of the next message to be processed
            }
          
        ]);
        
        },
    });
}

main().catch(console.error);