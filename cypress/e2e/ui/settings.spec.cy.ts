import userData from "../../fixtures/users.json";
describe("Personal Settings", () => {
    beforeEach(() => {
        cy.loginByApi(userData.email.valid, userData.password.valid).then((user) => {
            cy.wrap(user.body.data.user).as("user"); // Store user as alias
            cy.visit("/");
            cy.getBySel("sidebar-menuButton").click();
            cy.getBySel("sidebar-settings").click();
        });
    });
    context("Personal Settings", function () {
        beforeEach(() => {});
        it("test this.user", function () {
            console.log("user ", this.user);
        });
        it("Profile Info", function () {
            cy.wait(2000);

            cy.getBySel("settings-email")
                .should("be.visible")
                .invoke("text")
                .should("eq", userData.email.valid);

            cy.getBySel("settings-phone")
                .should("be.visible")
                .invoke("text")
                .and("eq", userData.phone.valid.english);

            cy.getBySel("settings-username")
                .should("be.visible")
                .invoke("text")
                .and("eq", userData.username.valid);
        });
    });
    context("settings-profileUpdate", function () {
        this.beforeEach(() => {
            cy.getBySel("settings-profileUpdate").click();
        });
        it("Validate Value in Profile Form is the same for the user", function () {
            cy.getBySel("settings-profile-email")
                .should("exist")
                .invoke("val")
                .should("eq", this.user.email || "");

            cy.getBySel("settings-profile-phone")
                .should("exist")
                .invoke("val")
                .should("eq", this.user.phone || "");

            cy.getBySel("settings-profile-username")
                .should("exist")
                .invoke("val")
                .should("eq", this.user.username || "");

            cy.getBySel("settings-profile-screenName")
                .should("exist")
                .invoke("val")
                .should("eq", this.user.screenName || "");

            cy.getBySel("settings-profile-bio")
                .should("exist")
                .invoke("val")
                .should("eq", this.user.bio || "");
        });

        it("Update value in Profile Form and reload to check ", function () {
            cy.getBySel("settings-profile-email").invoke("val", userData.email.newValid);
            cy.getBySel("settings-profile-emailButton").click();
            cy.getBySel("settings-profile-emailError", { timeout: 0 }).should("not.exist");

            cy.getBySel("settings-profile-phone").invoke("val", userData.phone.newValid);
            cy.getBySel("settings-profile-phoneButton").click();
            cy.getBySel("settings-profile-phoneError", { timeout: 0 }).should("not.exist");

            cy.getBySel("settings-profile-username").invoke("val", userData.username.newValid);
            cy.getBySel("settings-profile-usernameButton").click();
            cy.getBySel("settings-profile-usernameError", { timeout: 0 }).should("not.exist");

            cy.getBySel("settings-profile-screenName").invoke("val", userData.screenName.valid1);
            cy.getBySel("settings-profile-screenNameButton").click();
            cy.getBySel("settings-profile-screenNameError", { timeout: 0 }).should("not.exist");

            cy.getBySel("settings-profile-bio").invoke("val", userData.bio);
            cy.getBySel("settings-profile-bioButton").click();

            cy.visit("/");
            cy.getBySel("sidebar-menuButton").click();
            cy.getBySel("sidebar-settings").click();
            cy.getBySel("settings-profileUpdate").click();

            cy.wait(20000);

            cy.getBySel("settings-profile-email")
                .should("exist")
                .invoke("val")
                .should("eq", userData.email.newValid);

            cy.getBySel("settings-profile-username")
                .should("exist")
                .invoke("val")
                .should("eq", userData.username.newValid);

            cy.getBySel("settings-profile-phone")
                .should("exist")
                .invoke("val")
                .should("eq", userData.phone.newValid);

            cy.getBySel("settings-profile-screenName")
                .should("exist")
                .invoke("val")
                .should("eq", userData.screenName.valid1);

            cy.getBySel("settings-profile-bio")
                .should("exist")
                .invoke("val")
                .should("eq", userData.bio);
        });

        it("Update the fields that needs distinct value (email, username, phone)", () => {
            cy.getBySel("settings-profile-email").invoke("val", userData.email.duplicated);
            cy.getBySel("settings-profile-emailButton").click();
            cy.getBySel("settings-profile-emailError", { timeout: 0 }).should("exist");

            cy.getBySel("settings-profile-phone").invoke("val", userData.phone.duplicated);
            cy.getBySel("settings-profile-phoneButton").click();
            cy.getBySel("settings-profile-phoneError", { timeout: 0 }).should("exist");

            cy.getBySel("settings-profile-username").invoke("val", userData.username.duplicated);
            cy.getBySel("settings-profile-usernameButton").click();
            cy.getBySel("settings-profile-usernameError", { timeout: 0 }).should("exist");
        });
        it("update new image", () => {
            cy.getBySel("settings-profile-image").should("exist");
            cy.getBySel("settings-profile-image").selectFile("../../fixtures/image.png", {
                force: true,
            });
        });

        it("delete image", () => {
            cy.getBySel("settings-profile-deleteImageButton").click();
            cy.getBySel("settings-profile-image")
                .invoke("src")
                .should(
                    "eq",
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAA…YdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII="
                );
        });
    });
    context("Privacy and Security", () => {
        beforeEach(() => {
            cy.getBySel("settings-privacySecurityButton").click();
        });
        it.only("", () => {
            const buttons = ["seeStory", "seePhoto", "seeLastSeen", "seeReadReceipts"];

            for (const button of buttons) {
                cy.getBySel(`settings-privacySecurity-${button}`).click();

                cy.get('button[role="radio"][value="contacts"]')
                    .click() // Click the button to select it
                    .should("have.attr", "aria-checked", "true"); // Verify that the button is checked

                // Verify that other radio buttons are not checked
                cy.get('button[role="radio"][value="everyone"]').should(
                    "have.attr",
                    "aria-checked",
                    "false"
                );
                cy.get('button[role="radio"][value="nobody"]').should(
                    "have.attr",
                    "aria-checked",
                    "false"
                );

                // reload and check that it's saved
                cy.visit("/");
                cy.getBySel("sidebar-menuButton").click();
                cy.getBySel("sidebar-settings").click();
                cy.getBySel("settings-privacySecurityButton").click();
                cy.getBySel(`settings-privacySecurity-${button}`).click();

                cy.get('button[role="radio"][value="contacts"]').should(
                    "have.attr",
                    "aria-checked",
                    "true"
                );

                cy.get('button[role="radio"][value="everyone"]').should(
                    "have.attr",
                    "aria-checked",
                    "false"
                );

                cy.get('button[role="radio"][value="nobody"]').should(
                    "have.attr",
                    "aria-checked",
                    "false"
                );

                cy.get(
                    "div.false.settings-layout button[data-test=settings-leftArrowReturnButton]"
                ).click();
            }
        });
    });
});
