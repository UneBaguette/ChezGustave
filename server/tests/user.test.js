// Importation de la configuration de l'application
const supertest = require("supertest");



describe("test user", function () {
    let app;
    beforeEach(() => {
        app = supertest(require("../src/app"));
    })
    it("should get user", (done) => {
        app.get("/user").expect(200).end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).toBeInstanceOf(Array)
            done();
        })
    })
})