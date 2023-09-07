import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/Users.js"
import { JWT_Secret } from "../config/config.js";
import chalk from "chalk";

export const registerUser = async(req, res) =>{
    const {username,email,password} = req.body;
 //   console.log(`username: ${username} \nemail: ${email} \npassword: ${password}`)
   
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const userExists = await User.findOne({$or: [{username: username.toLowerCase()},{email: email.toLowerCase()}]});

        if(userExists){
            if(userExists.username == username.toLowerCase()){
                return res.status(400).send({status: false, message: "This Username is already exists"});
            }
            else if(userExists.email == email.toLowerCase()){
                return res.status(400).send({status: false, message: "This Email is already exists"});
            }
        }
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        });
        await user.save();
        res.status(200).send({status: true, message: "User registered successfully"});
    }catch(err){
        console.log("Error registering user: ", err)
        res.status(44).send({status: true, message: "Not Found"});
    }
}

export const loginUser = async(req,res) =>{

    try{
        const {username, password} = req.body;
        const isExists = await User.findOne({ username: username.toLowerCase() });
        if(!isExists){
            return res.status(400).send({status: false, message: "Invalid Username or Password"});
        }

        const validPassword = await bcrypt.compare(password, isExists.password);

        if(!validPassword){
            return res.status(400).send({status: false, message: "Invalid Username or Password"});
        }

        //JWT AUTHENTICATION

        const token = jwt.sign({ _id: isExists._id }, JWT_Secret);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 *1000//7 Days
        });
        isExists.password = undefined;
        res.status(200).send(isExists)
        

    }catch(err){
        console.log(`${chalk.red.bold('Error Occurs in Login: ')}`, err)
    }
}

export const getUserProfile  = async(req,res) =>{
   try{
    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).send({status:false, message: "NOT FOUND THIS UER"})
    }

    user.password = undefined;
    res.status(200).send(user)
   }catch(err){
    console.log(`${chalk.red.bold('ERROR AT USER PROFILE')}, ${err}`);
    res.status(404).send({status:false, message: "UNKNOW USER"})
   }
}


export const userLogout = async(req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).send('Successfully Logout.')

    }catch(err){
        res.status(404).send({status:false, message: "UnKnown ERROR,"})
    }
}