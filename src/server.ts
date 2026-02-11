import express from "express";
import {Request, Response, NextFunction} from "express"
import dotenv from "dotenv"; 

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (_, res: Response) => {
    res.json({status: "ok"});
});

app.post("/check", async (req: Request, res: Response) => {
    res.json({ message: "not implemented yet" });
});


app.use('/', (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(500).json({message: "something went wrong"});
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
    console.log(`link : http://localhost:${port}`);
});



