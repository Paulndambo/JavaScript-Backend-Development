const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000
const connectDB = require("./db/connect");
require("dotenv").config();
const databaseURL = process.env.MONGO_URI;
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//in-built middleware
app.use(express.json());
//app.use(morgan());

//importing routes
const tasks = require("./routes/tasks");

app.get("/", (req, res) => {
    res.send("TASK MANAGER HOME PAGE");
})

app.get("/hello", (req, res) => {
    res.send("Hello World, Task Manager");
});

//imported routes
app.use("/api/v1/tasks", tasks)

//custom middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

//make sure database is connected first
const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server Running on localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()

