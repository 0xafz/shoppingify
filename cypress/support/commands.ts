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

// Cypress.Commands.add('loginViaUI', (email: string,password: string) => {

// })

Cypress.Commands.add('signUpViaUI', (email: string, password: string) => {
  cy.intercept('/api/users').as('signUp')
  cy.session([email, password], () => {

    cy.visit('/user/sign-up')

    cy.get('input[name=name]').type('Test user')
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)

    cy.get('button[data-cy=submit]').click()

    cy.wait('@signUp').its('response.body.data').then((data) => {
      expect(data).to.haveOwnProperty('jwt');
      expect(typeof data.jwt).to.equal('string')
      expect(data).to.haveOwnProperty('refreshToken');
      expect(typeof data.refreshToken).to.equal('string')
    })
  })
})

Cypress.Commands.add('deleteAccountViaUI', () => {
  cy.visit('/user')

  cy.get('button[data-cy=deleteMyAccount]').click()

})
