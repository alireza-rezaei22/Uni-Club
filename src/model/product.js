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
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})
const productModel = mongoose.models?.product || mongoose.model('product', schema)
export default productModel