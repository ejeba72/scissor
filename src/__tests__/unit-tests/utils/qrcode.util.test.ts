import { join } from "path";
import { qrGenerator, qrcodeResMsg } from "../../../utils/qrcode.util";

const qrcodeFilePath = join(__dirname, "..", "..", "..", "..", "public", "test-img");
const shortUrl = 'localhost:1111/node';

describe('test the qrcode generator function', () => {
  test('generate qrcode', () => {
    expect(qrGenerator(qrcodeFilePath, shortUrl)).toBeDefined();
  });
});

describe('test qrcodeResMsg function', () => {
  test('when qrcode is requested', () => {
    expect(qrcodeResMsg(true)).toBe('QRCode was generated');
  });

  test('when qrcode is not requested', () => {
    expect(qrcodeResMsg(false)).toBe('QRCode was not requested for');
  });
});