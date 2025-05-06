import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";


const router = Router();

// @ts-ignore
router.post("/",authMiddleware,async (req, res) => {
    // @ts-ignore
    const userId = req.id;  
     const body = req.body;
     const parsedBody = ZapCreateSchema.safeParse(body);

     if (!parsedBody.success) {
         return res.status(411).json({
              message: "Invalid data",
               errors: parsedBody.error.errors 
             });    
        
     }

 const zapId = await prismaClient.$transaction(async tx => {
            const zap = await prismaClient.zap.create({
                data: {
                    triggerId: "",
                    userId: userId,
                    actions: {
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
          return zap.id
        });
            
    return res.json({
        message: "Zap created successfully",
        zapId: zapId,
    });
 });

// @ts-ignore
router.get("/",authMiddleware, (req, res) => {  
    // @ts-ignore
      const userId = req.id;
      const zaps = prismaClient.zap.findMany({
        where: {
            userId: userId,
        },
        include: {
            actions: {
                include: {
                    type: true,
                },
            },
            trigger: {
                include: {
                    type: true,
                },
            },
        },
    });

    if (!zaps) {
        return res.status(400).json({
            message: "No zaps found",
        });
    }
    return res.json({
        zaps: zaps,
        message: "Zaps fetched successfully",
    });
}
);

// @ts-ignore
router.get("/:zapId",authMiddleware, (req, res) => {
    // @ts-ignore
    const userId = req.id;
    const zapId = req.params.zapId;
    const zap = prismaClient.zap.findFirst({
        where: {
            userId: userId,
            id: zapId,
        },
        include: {
            actions: {
                include: {
                    type: true,
                },
            },
            trigger: {
                include: {
                    type: true,
                },
            },
        },
    });
    if (!zap) {
        return res.status(400).json({
            message: "Zap not found",
        });
    }
    return res.json({
        zap: zap,
        message: "Zap fetched successfully",
    });
});

export const zapRouter = router;