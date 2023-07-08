import supertest from "supertest";
import app from "../../../app";
import { urlRoute } from "../../../routes/url.route";
import { log } from "console";

const req = supertest(app);
const apiV1: string = '/api/v1';
app.use(`${apiV1}`, urlRoute);

describe('deleteQrcodeImg logic', () => {
  test('status code response for unauthenticated request', async () => {
    const res = await req.delete('/api/v1/deleteQrcodeImg');

    log({ resHeader: res.header, resHeaders: res.headers, resRedirect: res.redirect, resRedirects: res.redirects, resBody: res.body, resInfo: res.info, resUnauthorized: res.unauthorized, resStatusType: res.statusType, resType: res.type, resStatus: res.status, resServerError: res.serverError, resText: res.text });

    expect(res.statusCode).toBe(302);
    expect(res.redirect).toBe(true);
    expect(res.header.location).toBe('/scissor/login');
  });
  test('status code response for authenticated request', async () => {
    const res = await req.delete('/api/v1/deleteQrcodeImg');
    // req.saveCookies; req.attachCookies;
    expect(res.statusCode).toBe(204);
    expect(res.redirect).toBe(false);
    expect(res.header.location).toBeFalsy();
  });
});

