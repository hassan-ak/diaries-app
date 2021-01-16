// Imports
// Mirage Imports
import { Response, Request } from "miragejs";
// Server Imports
import { handleErrors } from "../server";
// Interface Imports
import { User } from "../../../interfaces/user.interface";
// Crypto imports
import { randomBytes } from "crypto";

// genrate token randomly
const generateToken = () => randomBytes(8).toString("hex");

// Type defination for AuthReponse
export interface AuthResponse {
    token: string;
    user: User;
}

// Login Function
// Schema is used for finding model declaration
const login = (schema: any, req: Request): AuthResponse | Response => {
    //user name and password
    const { username, password } = JSON.parse(req.requestBody);
    //Find a user from the data base
    const user = schema.users.findBy({ username });
    // check if user in not in data base
    if (!user) {
        return handleErrors(null, "No user with this username exists");
    }
    // check if password is not correct
    if (password !== user.password) {
        return handleErrors(null, "Password is incorrect");
    }
    // genrate renadom token
    const token = generateToken();
    // Login function returns here attrs return attributes a perticular entry
    return {
        user: user.attrs as User,
        token,
    };
};

// Signup Function
const signup = (schema: any, req: Request): AuthResponse | Response => {
    // Data entered while signingup
    const data = JSON.parse(req.requestBody);
    // Check if user already exist in the data base and return data/message based on that
    const exUser = schema.users.findBy({ username: data.username });
    if (exUser) {
        return handleErrors(null, "A user with that username already exists.");
    }
    // Genrate new user in the data base
    const user = schema.users.create(data);
    const token = generateToken();
    return {
        user: user.attrs as User,
        token,
    };
};

// Functions exports 
export default {
    login,
    signup,
};