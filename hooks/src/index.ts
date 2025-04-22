import express from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
// import { PrismaClient } from '@prisma/client'; // Uncomment if you need to use Prisma Client

const app = express();
const port = 3000;  


// password protection middleware

app.post("/hooks/catch/:userId/:zapId", async(req, res) => {  
  const { userId, zapId } = req.params;
  const { body } = req;
  console.log(`Received webhook for userId: ${userId}, zapId: ${zapId}`);
  console.log("Request body:", body); 

   // @ts-ignore
     await client.$transacton(async tx => {
      const run  = await tx.zapRun.create({
        data: { 
          zapId: zapId,
          metadata: body
        }
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        }
      });
    }

     );
     res.json({
      message: "Webhook received successfully",   
     })
    
} )


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});