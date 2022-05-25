const app = require('./app')
const mongoose = require("mongoose");
const config = require("./config/config")
const port = 8082


mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log("Connected to mongoDB")
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })
})