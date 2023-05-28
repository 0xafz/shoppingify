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

import { cfetchPromise } from "~/lib/cfetch";
import { getJwtToken, setJwtToken, setRefreshToken } from "~/utils/client/auth";

Cypress.Commands.add('resetAuth', () => {
  cy.clearAllCookies()
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
})

Cypress.Commands.add('resetAndVisitLoginPage', () => {
  cy.resetAuth();
  cy.visit('/user/sign-in');
})

Cypress.Commands.add('resetAndVisitSignUpPage', () => {
  cy.resetAuth();
  cy.visit('/user/sign-up');
})

Cypress.Commands.add('resetAndVisitHomePage', () => {
  cy.resetAuth();

  cy.intercept('/api/users/me').as('loginCheck')
  cy.intercept('/api/items').as('intialShoppingItemsFetch')

  cy.visit('/')
  cy.wait('@loginCheck').then(({ response }) => {
    expect(response.statusCode).eq(401);
  })
  cy.wait('@intialShoppingItemsFetch').then(({ response }) => {
    expect(response.statusCode).eq(401);
  })

  cy.contains('Please login').should('be.visible')
})

Cypress.Commands.add('clickLink', (label: string) => {
  cy.get('a').contains(label).click()
})

Cypress.Commands.add('deleteUserIfExists', () => {
  cy.request({
    url: '/api/users/me',
    method: 'GET',
  }).its('response.body.data').then((user) => {
    expect(user).to.haveOwnProperty('id');
    cy.request({
      url: `/api/users/${user.id}`,
      failOnStatusCode: false,
      method: 'DELETE',
    }).then(({ isOkStatusCode }) => {
      if (isOkStatusCode) {
        console.log('deleted test user')
      }
    })
  })
})


// Check: https://docs.cypress.io/api/commands/session
export type SessionId = string | object;

Cypress.Commands.add('loginViaUI', (email: string, password: string) => {
  cy.visit('/user/sign-in')

  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)

  cy.get('button[data-cy=submit]').click()
})


Cypress.Commands.add('signUpViaUI', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/user/sign-up')

    cy.get('input[name=name]').type('Test user')
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)

    cy.get('button[data-cy=submit]').click()

    cy.contains('allows you take your shopping list wherever you go')
  })
})

Cypress.Commands.add('deleteAccountViaUI', () => {

  cy.visit('/user')

  cy.get('button[data-cy=deleteMyAccount]').click()

  cy.get('button[data-cy="confirmAction"]').click()

})
