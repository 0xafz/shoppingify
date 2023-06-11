describe("Home", () => {
  it("should display login link", () => {
    cy.visit("/");

    cy.contains("Please login").should("be.visible");
    cy.clickLink("login");
  });
});
