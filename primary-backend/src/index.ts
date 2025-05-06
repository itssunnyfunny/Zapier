import express from 'express';
import { userROuter } from './router/user';
import { zapRouter } from './router/zap';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.use("/api/v1/user", userROuter);
app.use("/api/v1/zap", zapRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
