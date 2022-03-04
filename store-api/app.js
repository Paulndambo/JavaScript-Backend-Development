const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000
const products = require("./routes/products");
const connectDB = require("./db/connect")

//middleware
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Store API Is Working!!");
});

//custom urls
app.use("/api/v1/products", products)


const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server Running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()