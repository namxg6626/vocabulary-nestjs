import { Schema } from 'mongoose';

export const wordSchema = new Schema(
  {
    rxId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
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

export const modelName = 'Word';
