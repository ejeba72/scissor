import { config } from "dotenv";
import { generateUserId } from "../../../utils/userId.utils";

config();

const jwtToken1: any = undefined;
const jwtToken2: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZlZTJiM2MzYWVkMzkzN2I2ZGRhNSIsImlhdCI6MTY4ODU1OTk2OCwiZXhwIjoxNjg4ODE5MTY4fQ.EdhLAOtwFtjvXR2HBnYF3_8roq66-ThVIa9Bb4JEDZE'
const jwtSecret: any = process.env.JWT_SECRET_KEY;
const userId = '649fee2b3c3aed3937b6dda5';

describe('test the  generateUserId function', () => {

  test('when jwtToken is falsy or invalid', () => {
    expect(generateUserId(jwtToken1, jwtSecret)).toBe('');
  }) 

  test('when jwtToken and jwtSecret are valid', () => {
    expect(generateUserId(jwtToken2, jwtSecret)).toBe(userId);
  })
})