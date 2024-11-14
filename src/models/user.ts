import { model, Schema } from "mongoose";
import { OriginEnum } from "../types/Enum/originEnum";
import { AreaEnum } from "../types/Enum/areaEnum";
import { Interception } from "../types/Enum/interception";
import { IMissiles } from "../types/Enum/missilesEnum";
import { StatusMissiles } from "../types/Enum/statusMissile";

export interface RoketType {  
        name:string,
        amount: number
}




export interface IUser {
    _id:Schema.Types.ObjectId
    username:string
    password:string
    origin:OriginEnum
    resources:RoketType[]
    budget:number
    area:AreaEnum |null
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
        default:null,
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


export const UserSchema =  model<IUser>('User',userSchema)