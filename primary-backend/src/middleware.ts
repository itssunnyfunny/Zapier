import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization as unknown as string;

    try { 
    const paylaod = jwt.verify(token, JWT_SECRET) ;
    if (paylaod) {
        //@ts-ignore
        req.id = paylaod.id;
        next();
    } 
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
        
    }
   
}
