import mongoose from "mongoose";

const connectToDB = async ()=>{
    try{
        if(mongoose.connections[0].readyState){
            return true
        }else{
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/JClub')
            console.log('connection success');
        }
    }catch(err){
        console.log('connection faild', err);
    }
}
export default connectToDB