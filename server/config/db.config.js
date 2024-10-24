import mongoose from 'mongoose';


mongoose.set("strictQuery", false);

const connectToDB=async()=>{
    try{

    	const {connection}=await mongoose.connect(process.env.MONGODB_URI);
        
    	if(connection){
    		console.log(`connected to mongodb at ${connection.host} with ${connection.name}`);
    	}

    }catch(e){
        console.log(e);
    	process.exit(1);
    }


}

export default connectToDB;