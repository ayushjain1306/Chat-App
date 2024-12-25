import Users from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateToken(username){
    const token = jwt.sign({username}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

    return token;
}

async function performLogin(request, response){
    try {
        const user = request.body;
        const check = await Users.findOne({username: user.username});

        if (!check){
            return response.status(404).json({message: "Username not found."});
        }

        if (check.password !== user.password){
            return response.status(401).json({message: "Incorrect password"});
        }

        const token = generateToken(user.username);

        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return response.status(200).json({
            message: "User logged in successfully.",
        });
    }
    catch (error){
        response.status(500).json({message: error.message});
    }
}

async function performSignup(request, response) {
    try {
        const user = request.body;

        const check1 = await Users.findOne({email: user.email});

        if (check1){
            return response.status(409).json({message: "Email not available."});
        }

        const check2 = await Users.findOne({username: user.username});

        if (check2){
            return response.status(409).json({message: "Username not available."});
        }

        user.phone = parseInt(user.phone)

        const check3 = await Users.findOne({phone: user.phone});

        if (check3){
            return response.status(409).json({message: "Phone Number not available."});
        }

        await Users.create(user);

        return response.status(200).json({message: "User Account Created Successfully."});
    }
    catch (error){
        response.status(500).json({messsage: error.message});
    }
}

async function performLogout(request, response){
    try {
        const token = request.cookies.token;

        if (!token){
            return response.status(404).json({message: "Token Not Found."});
        }

        response.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        response.status(200).json({message: "User Logged Out Successfully."});
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export {
    performLogin,
    performSignup,
    performLogout
}