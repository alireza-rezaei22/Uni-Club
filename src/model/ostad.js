import mongoose from "mongoose";

const schema = mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
    },
    biography: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    studyField: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    courses: [{
        name: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
    }
    ],
    startYear: {
        type: String,
        required: false,
    },
    rate: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    registrarId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})
const ostadModel = mongoose.models?.ostad || mongoose.model('ostad', schema)
export default ostadModel