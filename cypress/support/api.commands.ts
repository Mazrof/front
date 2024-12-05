/// <reference types="cypress" />

const baseUrl = "http://localhost:3000";
Cypress.Commands.add("loginByApi", (email, password) => {
    let user: unknown;
    cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {
            email,
            password,
        },
    }).then((response) => {
        expect(response.status).equal(200);
        user = response.body.user;

        window.localStorage.setItem("user", JSON.stringify(user));

        return user;
    });
});
