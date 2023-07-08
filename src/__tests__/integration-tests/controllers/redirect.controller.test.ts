import supertest from "supertest";
import app from "../../../app";
import { log } from "console";
import { redirectRoute } from "../../../routes/redirect.route";

describe('testing jest itself! ;) ', () => {
  test('to ensure Jest does not play "wayo!"', () => {
    expect(true).toBe(true); // That this test passed, shows that Jest and I are on the same page! :)
  });
});

const req = supertest(app); // httpRequestWithSupertest
app.use(redirectRoute);

describe('testing the homepageRedirect logic', () => {
  test('GET "/"; redirects from "/" to "/scissor/homepage"', async () => {
    const res = await req.get('/');
    log({ resStatus: res.status, resLocation: res.headers.location, resHeaders: res.headers });
    expect(res.status).toBe(302);  // Check that the status code is a redirection
    expect(res.header.location).toBe('/scissor/homepage'); // Check the redirected location
  })
})

describe('testing the getRedirect logic', () => {
  test('GET "/:id"; redirects from short url to long url', async () => {
    const res = await req.get('/node');
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('https://nodejs.org');
  });
});