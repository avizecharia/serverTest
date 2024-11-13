import { model, Schema } from "mongoose"
import { AreaEnum } from "../types/Enum/areaEnum"
import { IMissiles } from "../types/Enum/missilesEnum"
import { StatusMissiles } from "../types/Enum/statusMissile"

export interface ILaunche{
    location:AreaEnum
    rocket:IMissiles
    time:number
    status:StatusMissiles
    userId:Schema.Types.ObjectId|null

}const launchesSchema = new Schema<ILaunche>({
    location:{
        type:String,
        enum:AreaEnum
    },
    rocket:{
        type:String,
        enum:IMissiles
    },
    time:{
        type:Number
    },
    status:{
        type:String,
        enum:StatusMissiles
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
})
export const LaunchesSchema =  model<ILaunche>('Launche',launchesSchema)
