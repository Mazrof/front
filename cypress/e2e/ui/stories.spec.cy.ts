describe("stories", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.getBySel("sidebar-menuButton").should("be.visible").click();
        cy.getBySel("sidebar-stories").click();
    });
    it("", () => {
        cy.visit("/");
        cy.getBySel("sidebar-menuButton").should("be.visible").click();
        cy.getBySel("sidebar-stories").click();
        cy.getBySel("story-text").invoke("val", "this is my first story with background green ");
        cy.getBySel("story-color").should("be.exist").invoke("val", "green");
        cy.getBySel("story-submit").should("be.visible").click();

        cy.getBySel("story-text").invoke("val", "this is my second story with background yellow ");
        cy.getBySel("story-color").should("be.exist").invoke("val", "yellow");
    });
});
