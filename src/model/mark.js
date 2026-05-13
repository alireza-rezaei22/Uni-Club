import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
})
const markModel = mongoose.models.mark || mongoose.model('mark', schema)
export default markModel