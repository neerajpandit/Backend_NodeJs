import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"

import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


const generateAccessAndRefershTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access tokens"
        );
    }
};


const registerUser = asyncHandler(async (req, res) => {

    const { username, email, fullName, password } = req.body;
    console.log(username)
    if (
        [username, email, fullName, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existUser = await User.findOne({
        $or: [{ username, email }]
    })
    if (existUser) {
        throw new ApiError(409, "username or Email already Exist")
    }
    const user = await User.create({
        username,
        email,
        fullName,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered Successfully"));

})

const loginUser = asyncHandler(async (req, res) => {


    const { username, password } = req.body
    // console.log(email);

    if (!username && !password) {
        throw new ApiError(400, "username or password is required")
    }


    const user = await User.findOne({
        $or: [{ username }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefershTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

export { registerUser, loginUser }