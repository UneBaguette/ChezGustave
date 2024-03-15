const supertest = require("supertest");

describe("API", () => {
  let app;

  beforeEach(() => {
    app = supertest(require("../src/app"));
  });

  it("Should get /", (done) => {
    // Envoyer une requête GET à la racine de l'application
    app
      .get("/")
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        // Vérifier la valeur de la clé dans la réponse JSON
        expect(response.body.test).toBe("Test API");
        done();
      });
  });
});
