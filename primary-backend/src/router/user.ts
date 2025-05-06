import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router = Router();
//@ts-ignore
router.post("/signup", async (req, res) => {  
    const body = req.body;
     const parsedBody = SignupSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(400).json({
             message: "Invalid data",
              errors: parsedBody.error.errors 
            });
    };

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedBody.data.email,
        },
    });

    if (userExists) {
        return res.status(400).json({
            message: "User already exists",
        });
    }
    const user = await prismaClient.user.create({
        data: {
            email: parsedBody.data.email,
            password: parsedBody.data.password,
            name: parsedBody.data.username,
        },
    });
     
// await sendEmail() 
    return res.json({
        message: "Please verify your email",
    });


}
);
//@ts-ignore
router.post("/signin", async(req, res) => {  
    const body = req.body;
    const parsedBody = SigninSchema.safeParse(body);

   if (!parsedBody.success) {
       return res.status(400).json({
            message: "Invalid data",
             errors: parsedBody.error.errors 
           });
   };  
   
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedBody.data.email,
            password: parsedBody.data.password,
        },
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }
    // Generate JWT token and send it to the user
    const token = jwt.sign({ id: user.id },JWT_SECRET);

    return res.json({
        token: token,
        message: "Signin successful",
    });

   

}
);
// @ts-ignore
router.get("/user", authMiddleware, async(req, res) => {
     //@ts-ignore
      const userId = req.id; 
      const user = await prismaClient.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            email: true,
            name: true,
        }
    });
    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }
    return res.json({
        user: user,
    });
});

    export const userROuter = router;