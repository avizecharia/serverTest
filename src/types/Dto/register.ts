import { AreaEnum } from "../Enum/areaEnum"
import { OriginEnum } from "../Enum/originEnum"





export interface RegisterDto {
    username:string
    password:string
    origin:OriginEnum
    area?:AreaEnum
}