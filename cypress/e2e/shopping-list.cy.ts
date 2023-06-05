import {
  Users,
  completListCTA,
  createShoppingList,
  rightSideDrawer,
  saveListNameForm,
  shoppingItem,
  shoppingItemAddButton,
} from "../support/constants";

const User2 = Users.user2;

const shoppinItems = [
  {
    name: "Test item 1",
    note: "Test item 1 note",
    categorySearchString: "Fruits",
  },
  {
    name: "Test item 2",
    note: "Test item 2 note",
    categorySearchString: "Meat",
  },
  {
    name: "Test item 3",
    note: "Test item 3 note",
    categorySearchString: "Beverages",
  },
  {
    name: "Test item 4",
    note: "Test item 4 note",
    categorySearchString: "Groceries",
  },
  {
    name: "Test item 5",
    note: "Test item 5 note",
    categorySearchString: "Other",
  },
];

before(() => {
  cy.task("deleteUserByEmail", User2.email);

  // Create user first
  cy.signUp(User2.email, User2.password);

  shoppinItems.forEach((item) => {
    cy.createShoppingItemAfterAuth(item);
  });
});

describe("Shopping List", () => {
  context("XL screen", () => {
    beforeEach(() => {
      cy.setScreenSize("xl");
    });

    it("should be able to add items and create an incomplete list", () => {
      cy.signIn(User2.email, User2.password);

      cy.visit("/");
      cy.get("button[data-cy='toggle-drawer']").click();

      cy.get(createShoppingList).contains("Un-named list").should("be.visible");

      cy.get("main").get(shoppingItem).get(shoppingItemAddButton).click({
        multiple: true,
      });

      cy.get(saveListNameForm).get('[data-cy="input"]').type("List 1");
      cy.get(saveListNameForm).get('[data-cy="save"]').click();

      cy.get(rightSideDrawer)
        .get(completListCTA)
        .as("completeListCTA")
        .scrollIntoView();

      cy.get("@completeListCTA").should("be.visible");
      cy.location("pathname").should("eq", "/history");

      cy.get("main").contains("h3", "List 1").should("be.visible");
      cy.get("main")
        .get('[data-cy="shoppingList"]')
        .contains("incomplete")
        .should("be.visible");
    });
    xit("should be able to view items in an incomplete list", () => {});
    xit("should be able to delete an incomplete list", () => {});
    xit("should be able to mark items as purchased in a incomplete list and complete the list", () => {});

    xit("should be able to delete the");
  });
});
