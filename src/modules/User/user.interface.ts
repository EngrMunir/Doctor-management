import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type Role = keyof typeof USER_ROLE;


export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;

  // doctor-specific
  specialization?: string;
  hospitalName?: string;
  hospitalFloor?: string;

  // patient-specific
  age?: number;
  gender?: 'male' | 'female' | 'other';

  refreshToken?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}



export interface UserModel extends Model<IUser>{
    isUserExistByEmail(email:string):Promise<IUser|null>;
    isPasswordMatched(
        plainTextPassword:string,
        hashedPassword:string,
    ):Promise<boolean>;
}

export type TUserRole = Role;