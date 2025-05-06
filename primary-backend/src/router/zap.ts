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

router.get("/:zapId",authMiddleware, (req, res) => {
    const zapId = req.params.zapId;

    console.log("zap route hit", zapId);
    res.status(200).json({ message: "Zap successful", zapId }); 
}
);

export const zapRouter = router;