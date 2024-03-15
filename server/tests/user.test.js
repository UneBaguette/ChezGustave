// Importation de la configuration de l'application
const supertest = require("supertest");
const { deleteUsers, createUsers } = require("../jest.setup");

describe("test user", function () {
  let app;
  let users;

  beforeEach(async () => {
    app = supertest(require("../src/app"));
    users = await createUsers();
  });

  it("should get user", (done) => {
    app
      .get("/user")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBeInstanceOf(Array);
        done();
      });
  });

  afterEach(async () => {
    await deleteUsers(users);
  });
});
