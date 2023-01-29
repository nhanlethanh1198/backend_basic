import mongoose from "mongoose";

import UserSchema from "@/schemas/user.schema";
import UserInterface from "@/interfaces/user.interface";

import ConstantModel from "@/constants/model.mongo.constant";

const UserModel = mongoose.model<UserInterface>(
  ConstantModel.USER_MODEL,
  UserSchema
);

export default UserModel;