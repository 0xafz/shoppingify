import {
  Users,
  completListCTA,
  createShoppingList,
  rightSideDrawer,
  saveListNameForm,
  shoppingItem,
  shoppingItemAddButton,
} from "../support/constants";

// Selectors
const listInfoGroup = '[data-cy="ListInfoGroup"]';
const historyListItem = 'main [data-cy="shoppingList"]';
const deleteShoppingBtn = 'button[data-cy="delete-shopping-list"]';
const listDeletePopover = '[data-cy="list-delete-popover"]';

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
  // {
  //   name: "Test item 3",
  //   note: "Test item 3 note",
  //   categorySearchString: "Beverages",
  // },
  // {
  //   name: "Test item 4",
  //   note: "Test item 4 note",
  //   categorySearchString: "Groceries",
  // },
  // {
  //   name: "Test item 5",
  //   note: "Test item 5 note",
  //   categorySearchString: "Other",
  // },
];

const shoppingList1 = {
  name: "List 1",
};

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

      // Add all items to current active list
      cy.get("main").get(shoppingItem).get(shoppingItemAddButton).click({
        multiple: true,
      });

      cy.get(saveListNameForm)
        .get('[data-cy="input"]')
        .type(shoppingList1.name);
      cy.get(saveListNameForm).get('[data-cy="save"]').click();

      cy.get(rightSideDrawer)
        .get(completListCTA)
        .as("completeListCTA")
        .scrollIntoView(); // TODO: why this??

      cy.get("@completeListCTA").scrollIntoView().should("be.visible");
      cy.location("pathname").should("eq", "/history");

      cy.get("main").contains("h3", shoppingList1.name).should("be.visible");

      cy.get(historyListItem)
        .contains("h3", shoppingList1.name)
        .should("be.visible");

      cy.get(historyListItem).contains("incomplete").should("be.visible");
    });
    it("should be able to view items in an incomplete list", () => {
      cy.signIn(User2.email, User2.password);

      cy.visit("/history");

      cy.contains("h1", "Shopping history").should("be.visible");

      cy.get(historyListItem);

      cy.get(historyListItem)
        .contains("h3", shoppingList1.name)
        .should("be.visible");

      cy.get(historyListItem)
        .contains("h3", shoppingList1.name)
        .parent()
        .contains("incomplete")
        .should("be.visible");

      cy.get(historyListItem).contains("h3", shoppingList1.name).click();

      cy.location("pathname").should("contain", "/history/list");

      cy.get("main").contains("h1", shoppingList1.name).should("be.visible");

      shoppinItems.forEach((item) => {
        const listGroup = cy
          .get(listInfoGroup)
          .and("contain.text", item.categorySearchString);
        listGroup.contains(item.name).should("be.visible");
      });
    });
    it("should be able to delete an incomplete list", () => {
      cy.signIn(User2.email, User2.password);

      cy.visit("/history");

      cy.get(historyListItem)
        .contains("h3", shoppingList1.name)
        .should("be.visible")
        .parent()
        .contains("incomplete")
        .should("be.visible");
      cy.get(historyListItem)
        .contains("h3", shoppingList1.name)
        .parent()
        .get(deleteShoppingBtn)
        .click();
      cy.get(listDeletePopover).contains("button", "Delete").click();
    });
    it("should be able to update item quantity and mark items as purchased in a incomplete list and complete the list", () => {
      cy.signIn(User2.email, User2.password);

      cy.visit("/");
      cy.get("button[data-cy='toggle-drawer']").click();

      cy.get(createShoppingList).contains("Un-named list").should("be.visible");

      // Add all items to current active list
      cy.get("main").get(shoppingItem).get(shoppingItemAddButton).click({
        multiple: true,
      });

      cy.get(rightSideDrawer)
        .get(saveListNameForm)
        .get('[data-cy="input"]')
        .type(shoppingList1.name);
      cy.get(saveListNameForm).get('[data-cy="save"]').click();

      shoppinItems.slice(0, 2).forEach((item) => {
        cy.get(rightSideDrawer)
          .contains("li", item.name)
          .find('button[aria-label="adjust quantity of this item"]')
          .as("adjustQty");

        cy.get("@adjustQty").click();

        cy.get(rightSideDrawer)
          .contains("li", item.name)
          .find('button[aria-label="increase item quantity by 1"]')
          .as("increaseBtn")
          .debug();

        cy.get("@increaseBtn").debug().click();

        cy.get(rightSideDrawer)
          .contains("li", item.name)
          .find('input[aria-label="mark item as done"]')
          .as("markAsDone");

        cy.get("@markAsDone").check();
      });

      cy.get(rightSideDrawer)
        .get(completListCTA)
        .as("completeListCTA")
        .scrollIntoView(); // TODO: why this??

      cy.get("@completeListCTA")
        .scrollIntoView()
        .should("be.visible")
        .contains("button", "Complete")
        .click();
    });
  });
});
