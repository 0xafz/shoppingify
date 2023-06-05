import { Users } from "../support/constants";

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

      cy.visit("/");
      cy.get("button[data-cy='toggle-drawer']").click();

      cy.get('aside[data-cy="right-side-drawer"]')
        .should("be.visible")
        .get('button[data-cy="add-item"]')
        .click();

      cy.get('aside[data-cy="right-side-drawer"]')
        .contains("h2", "Add a new item")
        .should("be.visible");

      cy.get("input[name=name]").type(ShoppingItem1.name);
      cy.get("textarea[name=note]").type(ShoppingItem1.note);
      cy.get("input[id=category]").type("Fruits");

      cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

      cy.get('button[data-cy="save-shopping-item"]').click();

      cy.get("main").should("contain", ShoppingItem1.name);

      cy.wait(5000);

      cy.get('aside[data-cy="right-side-drawer"]').should(
        "not.contain",
        "Item created!"
      );
    });

    it("should be able to delete", () => {
      cy.signIn(User2.email, User2.password);

      cy.visit("/");

      cy.contains(ShoppingItem1.name).should("be.visible");

      const buttonAriaLabel = `Open ${ShoppingItem1.name} details in Drawer`;

      cy.get(`button[aria-label="${buttonAriaLabel}"]`).click();

      cy.get('aside[data-cy="right-side-drawer"]')
        .should("be.visible")
        .get('button[data-cy="delete-item"]')
        .click();

      cy.get('button[data-cy="confirmAction"]').click();

      cy.get("main").should("not.contain", ShoppingItem1.name);
    });
  });
});
