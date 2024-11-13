import { model, Schema } from "mongoose";
import { OriginEnum } from "../types/Enum/originEnum";
import { AreaEnum } from "../types/Enum/areaEnum";

export interface RoketType {  
        name:string,
        amount: number
}

export interface IUser extends Document {
    username:string
    password:string
    origin:OriginEnum
    area?:AreaEnum
    resources:RoketType []
    budget:number
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    origin:{
        type:String,
        enum:OriginEnum,
        required:true
    },
    area:{
        type:String,
        enum:AreaEnum,
        required:false
    },
    resources:{
        type:[{  
            name:String,
            amount: Number
    }]
    },
    budget:{
        type:Number
    }
})

export default model<IUser>('User',userSchema)