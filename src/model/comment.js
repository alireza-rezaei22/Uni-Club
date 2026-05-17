import mongoose from "mongoose";

const schema = mongoose.Schema({
    ostadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ostad',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment:{
        type: String,
        min: 1,
        required: true
    }
}) 
const commentModel = mongoose.models?.comment || mongoose.model('comment', schema)
export default commentModel 