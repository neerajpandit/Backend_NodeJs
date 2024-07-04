import faker from 'faker';
import { asyncHandler } from "../utils/asyncHandler.js";
import { Person } from '../models/person.model.js'; // Adjust the path as needed
import { ApiResponse } from '../utils/ApiResponse.js';

// Function to generate an array of persons
const generatePersons = (num) => {
  const persons = [];
  for (let i = 0; i < num; i++) {
    persons.push({
      name: faker.name.findName(), // Adjust if necessary, e.g., faker.name.firstName() + ' ' + faker.name.lastName()
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
    });
  }
  return persons;
};

// Controller to seed persons into the database
const seedPersons = asyncHandler(async (req, res) => {
  try {
    const persons = generatePersons(1000);
    await Person.insertMany(persons);
    return res.status(201).json(new ApiResponse(201, null, '1000 persons added successfully'));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, `Error adding persons: ${error.message}`));
  }
});

export { seedPersons };
