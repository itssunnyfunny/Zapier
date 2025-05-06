import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignupSchema } from "../types";

const router = Router();

router.post("/signup", (req, res) => {  
    const body = req.body;
     const parsedBody = SignupSchema.safeParse(body);
    if (!parsedBody.success) {
        return res.status(400).json({ error: parsedBody.error.errors });
    }

}
);

router.post("/signin", (req, res) => {  
    console.log("signin route hit");
    res.status(200).json({ message: "User logged in" });    
}
);

router.get("/user", authMiddleware, (req, res) => {
    console.log("user route hit");
    res.status(200).json({ message: "User details" });    
}   
);

    export const userROuter = router;