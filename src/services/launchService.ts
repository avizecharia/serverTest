import { Schema } from "mongoose";
import { ILaunche, LaunchesSchema } from "../models/launche";
import { IUser, UserSchema } from "../models/user";

export const createLaunch = async (launche: ILaunche, typeOfSent: string) => {
  try {
    const myUser: IUser | null = await UserSchema.findOne({
      _id: launche.userId,
    }).lean();
    const withResource: ILaunche = {
      location: launche.location,
      rocket: launche.rocket,
      status: launche.status,
      time: launche.time,
      userId: launche.userId as Schema.Types.ObjectId,
    };
    const list = myUser?.resources;
    list?.map((a) => (a.name == typeOfSent ? (a.amount = a.amount - 1) : a));
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
