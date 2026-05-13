import mongoose from "mongoose";

const schema = mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    description: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    condition: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})
const productModel = mongoose.models?.product || mongoose.model('product', schema)
export default productModel