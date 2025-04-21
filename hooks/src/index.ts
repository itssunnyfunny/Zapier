import express from 'express';

const app = express();
const port = 3000;  


// password protection middleware

app.post("/hooks/catch:userId/:zapId", (req, res) => {  
  const { userId, zapId } = req.params;
  const { body } = req;
  console.log(`Received webhook for userId: ${userId}, zapId: ${zapId}`);
  console.log("Request body:", body);   
  // start in db a new trigger 
  // push it to a queue (kaafka, redis, etc.)
    // trigger the zap
} )