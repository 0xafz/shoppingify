import { Users, rightSideDrawer } from "../support/constants";

const User2 = Users.user2;

const ShoppingItem1 = {
  name: "Test item 1",
  note: "Test item 1 note",
};

before(() => {
  cy.task("deleteUserByEmail", User2.email);

  // Create user first
  cy.signUp(User2.email, User2.password);
});

describe("Shopping Item", () => {
  context("XL screen", () => {
    beforeEach(() => {
      cy.setScreenSize("xl");
    });

    it("should be able to create", () => {
      cy.signIn(User2.email, User2.password);

      cy.createShoppingItemAfterAuth(ShoppingItem1);

      cy.get("main").should("contain", ShoppingItem1.name);

      cy.wait(5000);

      cy.get(rightSideDrawer).should("not.contain", "Item created!");
    });

    it("should fail if user creates an item with existing name", () => {
      cy.signIn(User2.email, User2.password);

      cy.createShoppingItemAfterAuth(ShoppingItem1);

      cy.get(rightSideDrawer).should("not.contain", "Item created!");

      cy.get(rightSideDrawer).should("contain", "something went wrong");
    });

    it("should be able to delete", () => {
      cy.signIn(User2.email, User2.password);

      cy.visit("/");

      cy.contains(ShoppingItem1.name).should("be.visible");

      const buttonAriaLabel = `Open ${ShoppingItem1.name} details in Drawer`;

      cy.get(`button[aria-label="${buttonAriaLabel}"]`).click();

      cy.get(rightSideDrawer)
        .should("be.visible")
        .get('button[data-cy="delete-item"]')
        .click();

      cy.get('button[data-cy="confirmAction"]').click();

      cy.get("main").should("not.contain", ShoppingItem1.name);
    });
  });
});
