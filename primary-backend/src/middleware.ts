import { NextFunction, Request, Response } from "express";

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
    // Middleware logic to authenticate the user
    console.log("Auth middleware hit");
    next();
}
