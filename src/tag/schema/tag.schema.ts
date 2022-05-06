import { Schema } from 'mongoose';

export const tagSchema = new Schema(
  {
    rxId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    wordIds: [
      {
        type: String,
        required: true,
      },
    ],
    deleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const modelName = 'Tag';
