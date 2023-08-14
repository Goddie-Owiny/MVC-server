const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router = express.Router()
const user = require("../Models/userModels")
const jwt = require("jsonwebtoken")

const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY 

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"})
}

router.get("/login", (req, res) => {
    res.render("login")
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = req.user
       console.log(user)
    });

 router.post("/login", async (req, res) => {
    
    try{
                const user = await userModel.findOne({email});
        
                if(!user) return res.status(400).json("Invalid email or password...")
        
                const isValidPassword = await bcrypt.compare(password, user.password)
        
                if(!isValidPassword) return res.status(400).json("Invalid email or password")
        
                const token = createToken(user._id)
             
                res.status(200).json({_id: user._id, name: user.name, email, token});
                console.log("logged in as", user.name)
                res.redirect("/home")
            }catch(error){
               alert(error)
            }
})
 




module.exports = router;