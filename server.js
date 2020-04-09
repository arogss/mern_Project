var express = require("express")
var cors = require("cors")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000
const config = require("config")

require("dotenv").config()

const users = require("./routes/api/users")
const workouts = require("./routes/api/workouts")
const clients = require("./routes/api/clients")
const auth = require("./routes/api/auth")

app.use(express.json())
app.use(cors())

//DB config
const mongoURI = config.get("mongoURI")

//connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log("I'm Connected")).catch(err => console.log(err))

//use routes
app.use("/api/users", users)
app.use("/api/workouts", workouts)
app.use("/api/clients", clients)
app.use("/api/auth", auth)

app.listen(port, () => console.log(`Server started on port ${port}`))