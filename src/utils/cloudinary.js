import {v2 as cloudinary} from "cloudinary";
import { Console } from "console";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        }) 
        // file has been uploaded successfully
        Console.log("file is uploaded", 
        response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally save temporal file
        return null;
    }
}

export {uploadOnCloudinary}