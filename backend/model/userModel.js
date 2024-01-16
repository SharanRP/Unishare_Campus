const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String , required : true , unique:true },
    password: { type: String , required:true },
    pic:{
        type:String ,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},
{
    timestamps:true
})

userModel.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userModel.pre('save' , async function(next){
    if(!this.isModified()) 
    {
        next();
    };

    const salt = await bcrypt.genSalt(21);
    this.password = bcrypt.hash(this.password ,salt) ;
})

const User = mongoose.model("User" , userModel)

module.exports = User;