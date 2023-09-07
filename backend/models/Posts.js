import mongoose from "mongoose";

const postSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
    
},{timestamps:true});

const post = mongoose.model('Posts', postSchema);
export default post; 