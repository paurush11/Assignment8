import { userModel } from "../schemas/User";
import { encryptPassword } from "../utils/bcrypt";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response";
import { passwordStrength } from "check-password-strength";

export const createUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (email === undefined || password === undefined) {
      throw new Error("Arguments Missing");
    }
    const ans = passwordStrength(password).value;
    if (ans === "Weak") throw new Error("Password is Weak");
    const hashPassword = await encryptPassword(password);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    sendSuccessResponse(res, user);
  } catch (error) {
    sendSuccessResponse(res, error.message);
  }
};

export const updateHandler = async (req, res) => {
  try {
    const { oldName, newName, password } = req.body;
    if (
      oldName === undefined ||
      newName === undefined ||
      password === undefined
    ) {
      throw new Error("Arguments Missing");
    }
    const user = await userModel.findOne({ name: oldName });
    if (user === null) throw new Error("User Not Found");
    user.name = newName;
    if (ans === "Weak") throw new Error("Password is Weak");
    const hashPassword = await encryptPassword(password);
    user.password = hashPassword;
    await user.save();
    sendSuccessResponse(res, user);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const deleteHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      throw new Error("Arguments Missing");
    }
    const user = await userModel.findOne({ email });
    if (user === null) throw new Error("User Not Found");
    await user.remove();
    sendSuccessResponse(res, "Successfully Removed");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    sendSuccessResponse(res, users);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
