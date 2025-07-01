import { NewDeveloperData } from "../interfaces/developer.interface";
import DevelopersModel from "../models/developers.model";
import { ComparePassword, generateToken, HashPassword } from "../utils/helpers";

class AuthServiceClass {
  async login(data: { email: string; password: string }) {
    const developerInstance = await DevelopersModel.findOne({
      where: { email: data.email },
    });

    if (!developerInstance) {
      throw new Error("Developer not found");
    }

    let developer: NewDeveloperData = developerInstance.toJSON();

    const isPasswordValid = await ComparePassword(
      data.password,
      developer.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      id: Number(developer.id),
      email: developer.email,
      name: developer.name,
      role: developer.role,
    };

    const token = generateToken(payload);

    return {
      token,
      ...payload,
    };
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "developer";
  }) {
    const existingDeveloper = await DevelopersModel.findOne({
      where: { email: data.email },
    });

    if (existingDeveloper) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await HashPassword(data.password);

    await DevelopersModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "developer",
    });

    return {
      success: true,
    };
  }
}

const AuthService = new AuthServiceClass();
export default AuthService;
