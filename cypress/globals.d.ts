/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickLink(label: string): Chainable<any>
    resetAndVisitHomePage(): Chainable<any>
    resetAndVisitLoginPage(): Chainable<any>
    resetAndVisitSignUpPage(): Chainable<any>
    resetAuth(): Chainable<an>
    deleteUserIfExists(): Chainable<any>
    loginViaUI(id: string | object): Chainable<any> // TODO
    signUpViaUI(email: string, password: string): Chainable<any>// TODO
    deleteAccountViaUI(): Chainable<any>// TODO
  }
}