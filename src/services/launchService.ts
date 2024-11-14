import { Schema } from "mongoose";
import { ILaunche, LaunchesSchema } from "../models/launche";
import { IUser, RoketType, UserSchema } from "../models/user";
import { StatusMissiles } from "../types/Enum/statusMissile";

export const createLaunch = async (launche: ILaunche) => {
  try {
    console.log(launche.userId);
    
    const myUser: IUser | null |any = await UserSchema.findOne({
      _id: launche.userId,
    }).lean();
    if(!myUser) throw new Error("user not exists");
    const withResource: ILaunche = {
      location: launche.location,
      rocket: launche.rocket,
      status: launche.status,
      time: launche.time,
      userId: myUser?._id,
    };
    const list = myUser?.resources;
    list?.map((a:RoketType) => (a.name == launche.rocket ? (a.amount = a.amount - 1) : a));
    const res = await UserSchema.findOneAndUpdate(
      { _id: launche.userId },
      { ...myUser }
    );
    const newLaunche = await new LaunchesSchema(withResource);
    return await newLaunche.save();
  } catch (error) {
    throw new Error(`can't create a new launche${error}`);
  }
};
export const getYourDeffenceAttackService = async (area:string) => {
  const myLunches = await LaunchesSchema.find({location:area})
  return myLunches
}
export const  grtYourLauncheService = async(userId:string) => {
  const myLunche = await LaunchesSchema.find({userId:userId})
  return myLunche
}

export const changeStatusService = async(launchId:string,mtStatus:string,roketType:string,myUserId:string) => {
  
  const myLaunch = await LaunchesSchema.findOne({_id:launchId})
  if(!myLaunch){
    throw new Error(`lunache by id ${launchId} does not exists`);
  }
  const myUser:IUser|null= await UserSchema.findOne({_id:myUserId})
  if(!myUser)throw new Error("user does not exists");
  const list = myUser.resources
  list?.map((a:RoketType) => (a.name == roketType ? (a.amount = a.amount - 1) : a));
  const res = await UserSchema.findOneAndUpdate(
    { _id: myUserId },
    { ...myUser }
  );
    myLaunch.status = StatusMissiles.intercepted
  await myLaunch.save()
  return await LaunchesSchema.find({userId:myLaunch.userId})
}