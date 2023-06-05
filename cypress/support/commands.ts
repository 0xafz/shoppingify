// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import { submitSignInForm, submitSignUpForm } from "../utils/auth";
import {
  ScreenSizeToCypressPreset,
  loginCookieName,
  rightSideDrawer,
} from "./constants";

Cypress.Commands.add("resetAuth", () => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});

Cypress.Commands.add("clickLink", (label) => {
  cy.get("a").contains(label).click();
});

Cypress.Commands.add("signIn", (email, password) => {
  cy.session(
    ["SignIn", email, password],
    () => {
      cy.visit("/user/sign-in");
      submitSignInForm(email, password);
    },
    {
      validate() {
        cy.visit("/user");

        cy.contains("dd", email).should("be.visible");

        cy.getCookie(loginCookieName).should("exist");
      },
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add("signUp", (email, password) => {
  cy.session(
    ["SignUp", email, password],
    () => {
      cy.visit("/user/sign-up");

      submitSignUpForm(email, password);
    },
    {
      validate() {
        cy.visit("/user");

        cy.contains("dd", email).should("be.visible");

        cy.getCookie(loginCookieName).should("exist");
      },
    }
  );
});

Cypress.Commands.add("setScreenSize", (size) => {
  const presetValue = ScreenSizeToCypressPreset[size];
  if (Cypress._.isArray(presetValue)) {
    cy.viewport(presetValue[0], presetValue[1]);
  } else {
    cy.viewport(presetValue);
  }
});

Cypress.Commands.add("createShoppingItemAfterAuth", (item) => {
  cy.visit("/");
  cy.get("button[data-cy='toggle-drawer']").click();

  cy.get(rightSideDrawer)
    .should("be.visible")
    .get('button[data-cy="add-item"]')
    .click();

  cy.get(rightSideDrawer).contains("h2", "Add a new item").should("be.visible");

  cy.get("input[name=name]").type(item.name);
  cy.get("textarea[name=note]").type(item.note);
  cy.get("input[id=category]").type(item.categorySearchString);

  cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

  cy.get('button[data-cy="save-shopping-item"]').click();
});
