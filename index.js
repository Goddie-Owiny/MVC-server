const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session")
const app = express()



// importing the routes from the routes file
const registerRoute = require("./Routes/registerRoute")
const loginRoute = require("./Routes/loginRoute")


require("dotenv").config()


//(middleware function) adding extra capability to our application
app.use(express.json())
app.use(cors())


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', './views')
app.set('view engine', 'ejs')


//
app.use("/", registerRoute)

app.use("/login", loginRoute)






const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;



// connection to the local server using mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>console.log("Mongodb Connected Successfully"))
.catch((error) =>console.log("Mongodb connection Failed: ", error.message))

app.listen(port, (req, res) =>{
    console.log(`Server running on port: ${port}`)
});
