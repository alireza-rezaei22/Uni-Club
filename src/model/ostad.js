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
            required: false
        },
        day: {
            type: String,
            required: false
        },
        startTime: {
            type: Number,
            required: false
        },
        endTime: {
            type: Number,
            required: false
        },
        classLocation: {
            type: String,
            required: false
        }
    }
    ],
    startYear: {
        type: Number,
        required: false,
    },
    rate: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    registrarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
)
const ostadModel = mongoose.models?.ostad || mongoose.model('ostad', schema)
export default ostadModel