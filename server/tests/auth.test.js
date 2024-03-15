const { createUsers, deleteUsers } = require("../jest.setup");
const supertest = require("supertest");

describe("TEST /auth", () => {
  let app;
  let users;

  beforeEach(async () => {
    app = supertest(require("../src/app"));
    users = await createUsers();
  });

  it("should authenticate the user", (done) => {
    app
      .post("/auth")
      .send({
        email: users[0].email,
        password: "EZKIJHEZIUHJI",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe("Authentification réussie");
        done();
      });
  });

  afterEach(async () => {
    await deleteUsers(users);
  });
});
