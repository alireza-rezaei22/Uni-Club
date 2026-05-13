import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        minLength: 3,
        maxLength: 15,
    },
    phone:{
        type: String,
        require: true,
        length: 11,
    },
    password:{
        type: String,
        require: true,
        minLength: 4,
    }
})
const userModel = mongoose.models.user || mongoose.model('user', schema)
export default userModel