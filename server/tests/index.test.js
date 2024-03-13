const supertest = require('supertest');

describe('Tests', () => {
    let app;

    beforeAll(() => {
        app = supertest(require("../src/app"));
    });

    it('Should get /', (done) => {
        // Envoyer une requête GET à la racine de l'application
        app.get("/").expect(200).end((err, response) => {

            if (err) {
                done(err);
            } else {
                // Vérifier le code de statut HTTP
                expect(response.status).toBe(200);

                // Vérifier la valeur de la clé dans la réponse JSON
                expect(response.body.test).toBe("Test API");

                done();
            }
        });
    });
});
