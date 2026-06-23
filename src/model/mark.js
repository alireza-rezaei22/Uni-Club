import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'itemType'
    },
    itemType: {
        type: String,
        required: true,
        enum: ['product', 'ostad']
    }
})
const markModel = mongoose.models.mark || mongoose.model('mark', schema)
export default markModel