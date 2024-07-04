import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { Person } from "../models/person.model.js";

const dataPagination = asyncHandler(async (req, res) => {
   
    const pageNo = parseInt(req.query.pageNo) || 1;
    const rowSize = parseInt(req.query.rowSize) || 50;

    if(rowSize>100){
        throw new ApiError(400, 'Please Select rowSize less than or equal to 5')
    }

    const startIndex = (pageNo - 1) * rowSize;
    const paginatedUsers = await Person.find().skip(startIndex).limit(rowSize);
    const totalDocuments = await Person.countDocuments();
    const totalPages = Math.ceil(totalDocuments / rowSize);

    if(pageNo>totalPages){
        throw new ApiError(400, `Please Select Page No less then ${totalPages}`)
    }

    return res.status(200).json(new ApiResponse(200,{ users: paginatedUsers, totalPages }));
});


export { dataPagination};