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
import { ScreenSizeToCypressPreset } from "./constants";
import { loginCookieName } from "~/constants";

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
    [email, password],
    () => {
      cy.visit("/user/sign-in");
      submitSignInForm(email, password);
    },
    {
      validate() {
        // TODO: Since we don't have any visual indicator for successful login, we use below (which is bad imo)
        cy.getCookie(loginCookieName).should("exist");
      },
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add("signUp", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/user/sign-up");

      submitSignUpForm(email, password);
    },
    {
      validate() {
        // TODO: Since we don't have any great visual indicator for successful sign up, we use below (which is bad imo)
        cy.getCookie(loginCookieName).should("exist");
      },
      cacheAcrossSpecs: true,
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
