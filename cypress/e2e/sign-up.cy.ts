import { Users } from "../support/constants";
import { clickAndConfirmDeleteAccount, submitSignInForm } from "../utils/auth";

const User1 = Users.user1;

before(() => {
  cy.task("deleteUserByEmail", User1.email);
});

describe(
  "Sign up page",
  {
    testIsolation: true,
  },
  () => {
    context("XL screen", () => {
      beforeEach(() => {
        cy.setScreenSize("xl");
      });
      it("should allow users signup", () => {
        cy.visit("/");

        cy.signUp(User1.email, User1.password);

        cy.visit("/");

        cy.contains(
          "h1",
          "Shoppingify allows you take your shopping list wherever you go"
        ).should("be.visible");

        cy.get('input[placeholder="search item"]').should("be.visible");
      });

      it("should allow users to logout", () => {
        cy.signIn(User1.email, User1.password);

        cy.visit("/user");

        cy.get("button[data-cy=logout]").click();

        cy.contains("h1", "Sign In");
      });

      it("should allow users to delete their account", () => {
        cy.visit("/");

        cy.signIn(User1.email, User1.password);

        cy.visit("/user");

        clickAndConfirmDeleteAccount();

        cy.visit("/user/sign-in");

        submitSignInForm(User1.email, User1.password);

        cy.contains("h1", "Sign In").should("be.visible");

        cy.visit("/user").contains("a", "login");
      });
    });

    context("SM screen", () => {
      beforeEach(() => {
        cy.setScreenSize("sm");
      });

      it("should allow users signup", () => {
        cy.visit("/user/sign-up");

        cy.signUp(User1.email, User1.password);

        cy.visit("/");
        cy.contains(
          "h1",
          "Shoppingify allows you take your shopping list wherever you go"
        ).should("not.be.visible");

        cy.get('input[placeholder="search item"]').should("be.visible");
      });

      it("should allow users to logout", () => {
        cy.signIn(User1.email, User1.password);

        cy.visit("/user");

        cy.get("button[data-cy=logout]").click();

        cy.contains("h1", "Sign In");
      });

      it("should allow users to delete their account", () => {
        cy.visit("/user/sign-in");

        cy.signIn(User1.email, User1.password);

        cy.visit("/user");

        clickAndConfirmDeleteAccount();

        cy.visit("/user/sign-in");

        submitSignInForm(User1.email, User1.password);

        cy.contains("h1", "Sign In").should("be.visible");

        cy.visit("/user").contains("a", "login");
      });
    });
  }
);
