require("dotenv").config();
const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000
const mongoose = require("mongoose");
const closeRedisConnectionMiddleware = require("./middlewares/redisMiddleware");

//connect to mongoDB server
const url = process.env.MONGODB_URL
mongoose.connect(url);

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

app.use(closeRedisConnectionMiddleware)

app.listen(port, () => {
    console.log(`this app listening on port ${port}`)
})

module.exports = app