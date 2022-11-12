import mongoose from "mongoose";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passRegex = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";
const userSchema = new mongoose.Schema(
  {
    name :{
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegex,
    },
    password: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at", 
    },
  }
);

export const userModel = mongoose.model("User", userSchema);
