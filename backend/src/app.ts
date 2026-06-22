import express, { type Request, type Response } from "express";
import userRoutes from "./routes/user.routes";
import postsRoutes from "./routes/posts.routes";
import techstackRoutes from "./routes/techstack.routes";

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/techstack', techstackRoutes);


app.get("/", async (req: Request, res: Response) => {
  return res.send("API ALIVE")
});

export default app;
