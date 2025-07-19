/// <reference path="./types/express/index.d.ts" />
import dotenv from "dotenv";
import express from "express";
import todoRoutes from "./routes/todoRoutes";
import cors from "cors";
import { connectDB } from "./db";
import { ErrorRequestHandler } from "./types/express/error";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
console.log("PORT :", PORT);

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const jsonErrorHandler: ErrorRequestHandler = (err, _, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ msg: "Invalid JSON in request body" });
    }
    next();
};

app.use(jsonErrorHandler);
app.get("/", (_, res) => {
  res.send("API is working");
});

try {
  app.use("/api/todos", todoRoutes);
} catch (err) {
  console.error("Failed to load todoRoutes:", err);
}

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});