const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, minlength: 3, maxlength: 30},
    email: {type: String, 
        require: true, 
        minlength: 3, 
        maxlength: 200, 
        unique: true
    },
    password: {type: String, require: true, minlength: 3, maxlength: 1024},
},
   {
        timestamps: true,
    }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" })

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;

