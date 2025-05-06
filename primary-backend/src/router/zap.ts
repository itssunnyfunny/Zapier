import { Router } from "express";
import { authMiddleware } from "../middleware";


const router = Router();


router.post("/zap",authMiddleware, (req, res) => {  
    console.log("zap route hit");
    res.status(200).json({ message: "Zap successful" });    
}
);

router.get("/zap",authMiddleware, (req, res) => {  
    console.log("zap route hit");
    res.status(200).json({ message: "Zap successful" });    
}
);

export const zapRouter = router;