const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const connectDB = require("./db/connect");
const mainRouters = require("./routes/main");

app.use(express.json())

app.get("/", (req, res) => {
    res.send("JWT BASICS PROJECT!!!")
});

app.use("/api/v1", mainRouters);

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server Running on localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();