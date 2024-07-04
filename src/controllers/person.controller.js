import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Person } from "../models/person.model.js";

const createPerson = asyncHandler(async (req, res) => {
    const { name, email, address } = req.body;


    if (!name || !email || !address) {
        throw new ApiError(400, "Name, email, and address are required");
    }


    const existingPerson = await Person.findOne({ email });
    if (existingPerson) {
        throw new ApiError(409, "Email already exists");
    }


    const person = await Person.create({ name, email, address });


    return res.status(201).json(new ApiResponse(201, person, "Person created successfully"));
});

const updatePerson = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;

    const person = await Person.findById(id);
    if (!person) {
        throw new ApiError(404, "Person not found");
    }

    person.name = name || person.name;
    person.email = email || person.email;
    person.address = address || person.address;
    await person.save();

    return res.status(200).json(new ApiResponse(200, person, "Person updated successfully"));
});

const deletePerson = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const person = await Person.findByIdAndDelete(id);
    if (!person) {
        throw new ApiError(404, "Person not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "Person deleted successfully"));
});

const getPersons = asyncHandler(async (req, res) => {
    const persons = await Person.find();
    return res.status(200).json(new ApiResponse(200, persons, 'Persons fetched successfully'));
  });


export { createPerson, updatePerson,deletePerson, getPersons};