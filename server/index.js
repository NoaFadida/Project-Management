// Requiring Package
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
// Require Models
const authRoutes = require("./routes/auth");

dotenv.config();
app.use(express.json());

//Connect To DB 
mongoose.connect(
    process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

//לאפשר קריאות
app.use(
    cors({
        origin: "*",
        credentials: true,
        optionSuccessStatus: 200,
    })
);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT} !`);
});