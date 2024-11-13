import { compare, hash } from "bcrypt";
import { RegisterDto } from "../types/Dto/register";
import  {UserSchema, RoketType, IUser } from "../models/user";
import { OriginEnum } from "../types/Enum/originEnum";
import { AreaEnum } from "../types/Enum/areaEnum";
import { getData } from "../config/getDataJson";
import { LoginDto } from "../types/Dto/loginDto";
import jwt from "jsonwebtoken"
import { LaunchesSchema } from "../models/launche";
import { StatusMissiles } from "../types/Enum/statusMissile";
export interface IResurce {
  name: string;
  resources: [
    {
      name: string;
      amount: number;
    }
  ];
  budget: number;
}

export const createNewUser = async (user: RegisterDto) => {
  try {
    if (!user.password)
      throw new Error("Missing user data,[password] is require");

    const encPass = await hash(user.password, 10);
    user.password = encPass;

    const str =
      user.origin == OriginEnum.IDF
        ? user.origin + " - " + user.area
        : user.origin;
    const data = await getData(str);
    const resource: IResurce = data[0];
    const withResource =  { ...user, resources:resource.resources as RoketType[],budget:resource.budget };
    const newUser = await new UserSchema(withResource)
    return await newUser.save();
  } catch (error) {
    throw new Error("can't create a new user");
  }
};




export const userLoginService = async (user: LoginDto) => {
    try {
        console.log("object")
      const userFromDataBase:IUser | null = await UserSchema.findOne({ username: user.username }).lean();
      if (!userFromDataBase) {
        throw new Error("user was not found");
      }
      console.log(userFromDataBase);
      const match = await compare(user.password, userFromDataBase.password);
      if (!match) throw new Error("wrong password");
      
      const token  = await jwt.sign(
        {
          username:userFromDataBase.username,
          origin:userFromDataBase.origin,
          area:userFromDataBase.area,
          resources:userFromDataBase.resources,
          budget:userFromDataBase.budget
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "10m" }
      );
      console.log(token);
      return {...userFromDataBase , token,password:"*******"};
    } catch (err) {
      throw err;
    }
  };

export const  grtYourLauncheService = async(userId:string) => {
    const myLunche = await LaunchesSchema.find({userId:userId})
    return myLunche
  }
  
export const changeStatusService = async(launchId:string,mtStatus:string) => {
    const myLaunch = await LaunchesSchema.findOne({_id:launchId})
    if(!myLaunch){
        throw new Error(`lunache by id ${launchId} does not exists`);
    }
    myLaunch.status = StatusMissiles[mtStatus as StatusMissiles]
    await myLaunch.save()
    return myLaunch
}