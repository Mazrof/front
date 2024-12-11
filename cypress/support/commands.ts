/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import userData from "../fixtures/users.json";

Cypress.Commands.add("getBySel", (selector, ...args) => {
    cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("login", (email, password) => {
    cy.getBySel("login-email").invoke("val", email);
    cy.getBySel("login-password").invoke("val", password);
    cy.getBySel("login-submit").invoke("click");
});

Cypress.Commands.add("signup", (userData) => {
    cy.getBySel("signup-name").invoke("val", userData.name);
    cy.getBySel("signup-email").invoke("val", userData.email);
    cy.getBySel("signup-username").invoke("val", userData.username);
    cy.getBySel("signup-password").invoke("val", userData.password);
    cy.getBySel("signup-repeatPassword").invoke("val", userData.repeatPassword);
    // cy.getBySel("signup-phone").invoke("val", userData.phone);
    cy.getBySel("signup-submit").invoke("click");
});

Cypress.Commands.add("errorAssertions", (errorFields) => {
    const allFields = ["email", "password", "repeatPassword", "phone", "username", "name"];

    const noErrorFields = allFields.filter((field) => {
        return !errorFields.includes(field);
    });

    cy.wait(500);

    for (const field of noErrorFields) {
        cy.getBySel(`signup-${field}-error`, { timeout: 0 }).should("not.exist");
    }
    for (const field of errorFields) {
        cy.getBySel(`signup-${field}-error`).should("exist");
    }
});

Cypress.Commands.add("loginErrorAssertions", (errorFields) => {
    const allFields = ["email", "password"];

    const noErrorFields = allFields.filter((field) => {
        return !errorFields.includes(field);
    });

    cy.wait(500);

    for (const field of noErrorFields) {
        cy.getBySel(`signup-${field}-error`, { timeout: 0 }).should("not.exist");
    }
    for (const field of errorFields) {
        cy.getBySel(`signup-${field}-error`).should("exist");
    }
});

Cypress.Commands.add("loginByApi", (email, password) => {
    let user: object;
    cy.request({
        method: "POST",
        url: `http://localhost:3000/api/v1/auth/login`,
        body: {
            email,
            password,
        },
    }).then((response) => {
        user = response.body.user;
        window.localStorage.setItem("user", JSON.stringify(user));
        return user;
    });
});

Cypress.Commands.add("loginAndGoToSettings", () => {
    return cy.loginByApi(userData.email.valid, userData.password.valid).then((user) => {
        cy.wrap(user.body.data.user).as("user"); // Store the user object as an alias
        cy.visit("/");
        cy.getBySel("sidebar-menuButton").click();
        cy.getBySel("sidebar-settings").click();
        return user.body.data.user; // Return the user object for chaining
    });
});

Cypress.Commands.add("loginByGitHub", (email, password) => {
    cy.origin("https://github.com/", { args: [email, password] }, ([email, password]) => {
        cy.get("#login").type(email);
        cy.get("#password").type(password);
        cy.get('[data-signin-label="Sign in"]').click();
    });
});

// Cypress.Commands.add("loginByGoogle", (email, password) => {
//     cy.origin("https://accounts.google.com", { args: [email, password] }, ([email, password]) => {
//         cy.get('[type="email"]');
//         cy.get(".VfPpkd-RLmnJb").click();
//     });
// });

Cypress.Commands.add("AssertSuccessfulOAuth", (email) => {
    cy.visit("/");
    cy.getBySel("sidebar-menuButton").click();
    cy.getBySel("sidebar-settings").click();

    cy.getBySel("settings-email").should("be.visible").invoke("text").should("eq", email);
});

Cypress.Commands.add("loginByGoogleUI", (email, password) => {
    cy.log("Logging in to Google via UI");

    // Handle redirection to Google's login page
    cy.origin(
        "https://accounts.google.com",
        { args: { email, password } },
        ({ email, password }) => {
            // Enter the email
            cy.get('input[type="email"]').type(email, { log: false });
            cy.contains("Next").click();

            // Wait for the password field and enter the password
            cy.get('input[type="password"]').type(password, { log: false });
            cy.contains("Next").click();
        }
    );

    // Assert the login was successful and redirected to the expected page
    cy.url().should("include", "/dashboard"); // Adjust based on the redirection URL after login
    cy.get("header").should("contain", "Welcome"); // Adjust the selector/content for verification
});

Cypress.Commands.add("loginByGoogleApi", () => {
    cy.log("Logging in to Google");
    cy.request({
        method: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        body: {
            grant_type: "refresh_token",
            client_id: Cypress.env("googleClientId"),
            client_secret: Cypress.env("googleClientSecret"),
            refresh_token: Cypress.env("googleRefreshToken"),
        },
    }).then(({ body }) => {
        const { access_token, id_token } = body;

        cy.request({
            method: "GET",
            url: "https://www.googleapis.com/oauth2/v3/userinfo",
            headers: { Authorization: `Bearer ${access_token}` },
        }).then(({ body }) => {
            cy.log(body);
            const userItem = {
                token: id_token,
                user: {
                    googleId: body.sub,
                    email: body.email,
                    givenName: body.given_name,
                    familyName: body.family_name,
                    imageUrl: body.picture,
                },
            };

            window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
            cy.visit("/");
        });
    });
});
