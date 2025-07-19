require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI)
    .then(() =>
        console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error :", err);
    })

const app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const formRoutes = require("./src/routes/formRoutes");

app.use("/api/forms", formRoutes);

app.get("/", (req, res) => {
    res.send("Form Builder API is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});