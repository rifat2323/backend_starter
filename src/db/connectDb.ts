import mongoose  from "mongoose";

const connectDb = async ()=>{
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI!)
       return conn

    }catch(error){
        console.log(error)
        return error
    }
}

export default connectDb

