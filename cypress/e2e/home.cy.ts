it('home page main content', () => {
  cy.resetAndVisitHomePage();

  // Click on login
  cy.clickLink('login')

  cy.location('pathname').should('eq', '/user/sign-in')

  cy.contains('h1', 'Sign In').end()
})
