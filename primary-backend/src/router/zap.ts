import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";


const router = Router();

// @ts-ignore
router.post("/",authMiddleware,async (req, res) => {  
     const body = req.body;
     const parsedBody = ZapCreateSchema.safeParse(body);

     if (!parsedBody.success) {
         return res.status(411).json({
              message: "Invalid data",
               errors: parsedBody.error.errors 
             });    
        
     }

     await prismaClient.$transaction(async tx => {
            const zap = await prismaClient.zap.create({
                data: {
                    triggerId: "",
                    action: {
                        create: parsedBody.data.actions.map((x,index)=>({
                            actionId: x.availableActionId,
                            sortingOrder: index,
                        }))
                    }
                }
            })

            const trigger = await tx.trigger.create({
                data: {
                    triggerId: parsedBody.data.availableTriggerId,
                    zapId: zap.id,
                },
            });
            await tx.zap.update({
                where: {
                    id: zap.id,
                },
                data: {
                    triggerId: trigger.id,
                },
            });
          
        })
            

 });

// @ts-ignore
router.get("/",authMiddleware, (req, res) => {  
    console.log("zap route hit");
    res.status(200).json({ message: "Zap successful" });    
}
);

// @ts-ignore
router.get("/:zapId",authMiddleware, (req, res) => {
    const zapId = req.params.zapId;

    console.log("zap route hit", zapId);
    res.status(200).json({ message: "Zap successful", zapId }); 
}
);

export const zapRouter = router;