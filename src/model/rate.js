import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ostadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ostad',
        required: true
    },
    rate:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
})
const rateModel = mongoose.models?.rate || mongoose.model('rate', rateSchema)
export default rateModel