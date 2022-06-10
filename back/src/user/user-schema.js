import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});
