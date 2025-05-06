import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", (req, res) => {  
    console.log("signup route hit");
    res.status(200).json({ message: "User signed up" });    

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