import mongoose from "mongoose";

export async function dbConnection(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected' , ()=>{
            console.log("Mongo Database is Connected ");
        })

        connection.on('error' , (err)=>{
            console.log("Error Occurred during database connection" , err);
        })
    }catch(error){
        console.log("Something bad happened " , error);
    }
}