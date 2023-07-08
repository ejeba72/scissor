"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const qrcode_util_1 = require("../../../utils/qrcode.util");
const qrcodeFilePath = (0, path_1.join)(__dirname, "..", "..", "..", "..", "public", "test-img");
const shortUrl = 'localhost:1111/node';
describe('test the qrcode generator function', () => {
    test('generate qrcode', () => {
        expect((0, qrcode_util_1.qrGenerator)(qrcodeFilePath, shortUrl)).toBeDefined();
    });
});
describe('test qrcodeResMsg function', () => {
    test('when qrcode is requested', () => {
        expect((0, qrcode_util_1.qrcodeResMsg)(true)).toBe('QRCode was generated');
    });
    test('when qrcode is not requested', () => {
        expect((0, qrcode_util_1.qrcodeResMsg)(false)).toBe('QRCode was not requested for');
    });
});
