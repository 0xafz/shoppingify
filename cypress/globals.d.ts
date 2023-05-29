/// <reference types="cypress" />

declare namespace Cypress {
  type SCREEN_SIZE = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  interface Chainable {
    clickLink(label: string): Chainable<any>
    resetAuth(): Chainable<an>
    signIn(email: string, password: string): Chainable<any>
    signUp(email: string, password: string): Chainable<any>
    setScreenSize(size: SCREEN_SIZE): Chainable<any>
  }
}