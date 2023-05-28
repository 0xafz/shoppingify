/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickLink(label: string): Chainable<any>
    resetAndVisitHomePage(): Chainable<any>
    resetAndVisitLoginPage(): Chainable<any>
    resetAndVisitSignUpPage(): Chainable<any>
    resetAuth(): Chainable<an>
    deleteUserIfExists(): Chainable<any>
    loginViaUI(email: string, password: string): Chainable<any>
    signUpViaUI(email: string, password: string): Chainable<any>
    deleteAccountViaUI(): Chainable<any>
  }
}