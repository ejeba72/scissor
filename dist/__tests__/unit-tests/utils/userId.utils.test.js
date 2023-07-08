"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const userId_utils_1 = require("../../../utils/userId.utils");
(0, dotenv_1.config)();
const jwtToken1 = undefined;
const jwtToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWZlZTJiM2MzYWVkMzkzN2I2ZGRhNSIsImlhdCI6MTY4ODU1OTk2OCwiZXhwIjoxNjg4ODE5MTY4fQ.EdhLAOtwFtjvXR2HBnYF3_8roq66-ThVIa9Bb4JEDZE';
const jwtSecret = process.env.JWT_SECRET_KEY;
const userId = '649fee2b3c3aed3937b6dda5';
describe('test the  generateUserId function', () => {
    test('when jwtToken is falsy or invalid', () => {
        expect((0, userId_utils_1.generateUserId)(jwtToken1, jwtSecret)).toBe('');
    });
    test('when jwtToken and jwtSecret are valid', () => {
        expect((0, userId_utils_1.generateUserId)(jwtToken2, jwtSecret)).toBe(userId);
    });
});
