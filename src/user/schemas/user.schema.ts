import { Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const modelName = 'User';

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.password = null;
  return obj;
};
