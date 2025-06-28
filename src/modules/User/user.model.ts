import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import { USER_ROLE } from './user.constant';
import config from '../../app/config';
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.patient,
    },
    phone: String,

    // Doctor-specific fields
    specialization: String,
    hospitalName: String,
    hospitalFloor: String,

    // Patient-specific fields
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },

    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);



userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') && user.password) {
    const saltRounds = Number(config.bcrypt_salt_rounds || 10);
    user.password = await bcrypt.hash(user.password, saltRounds);
  }

  next();
});


// find user by using email
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

// Check if password is correct or not
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
