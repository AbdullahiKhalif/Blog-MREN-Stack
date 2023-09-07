import mongoose from "mongoose";
import { dbURL } from "./config.js";
import chalk from "chalk";
const connectDb = async() =>{
   try{
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`${chalk.green.bold('Connected')} to Database`);
   }catch(err){
    console.log(`${chalk.red.bold('ERROR')} For Connection`)
   }
}

export default connectDb;