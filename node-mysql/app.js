const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
//const connection = require("./db/connect");
const programmingLanguagesRouter = require("./routes/programming-languages");


app.get("/", (req, res) => {
    res.send("NodeJs & MySQL Crash Course!!")
});

app.use("/api/v1/languages", programmingLanguagesRouter)


const start = async () => {
    try {
        //await connection.connect((err) => {
        //    if(err) throw err;
        //    console.log("Database Connected Successfully!!")
        //});
        app.listen(PORT, () => {
            console.log(`Server Running on localhost:${PORT}`)
        });

    } catch (error) {
        console.log(error)
    }
}

start()