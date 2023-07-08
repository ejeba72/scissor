import supertest from "supertest"
import app from "../../../app"

const req = supertest(app);

describe('POST "/api/vi/user/signup"; signupLogic logic', () => {
  describe('when user provide signup details', () => {
    test('should respond with 200 status code', async () => {
      const res = await req.post('/api/vi/user/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        username: 'JJ',
        password: 'johndoe123',
      })
      expect(res.status).toBe(201);
    })
  })
})