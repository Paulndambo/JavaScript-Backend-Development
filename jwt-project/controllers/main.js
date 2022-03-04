const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.send("No Username & Password!!!")
    }

    res.status(200).json({msg: "Username & Password Found!!"})
}


const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg: 'Hello, Paul Ndambo', secret: `Your Secret Number is: ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard,
}