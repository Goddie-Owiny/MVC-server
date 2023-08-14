const express = require("express")
const bcrypt = require("bcrypt")
const validator = require("validator")
const router = express.Router()
const userModel = require("../Models/userModels")
const jwt = require("jsonwebtoken")


const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY 

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"})
}

router.get("/register", (req, res) => {
    res.render("register")
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post("/", async (req, res) => {
    try{

        const {username, password, email} = req.body;
     
        let user = await userModel.findOne({email});
     
        if(user) return res.status(400).json("User with the give Email already exist...");
     
        if(!username || !email || !password) return res.status(400).json("All fields are required...");
     
     
        if(!validator.isEmail(email))
        return res.status(400).json("Email must be valid...");
     
        if(!validator.isStrongPassword(password))
        return res.status(400).json("Must be a strong password..");
     
        user = new userModel({username, email, password})
     
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        // console.log(user)

        const token = createToken(user._id)
     
        // res.status(200).json({_id: user._id, username, email, token});
        res.redirect("/login");
    } catch (error) {
        console.log(error)
        
        res.status(500).json(error)
    }
})


module.exports = router;