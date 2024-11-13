import { connect } from "mongoose";

 const connectToMongo = async () => {
    try {
        
        connect(process.env.DB_URI as string)
        console.log("connected to mongo");
    } catch (error) {
        console.log("cant coonect to mongo",error)
    }
    
}
export default connectToMongo