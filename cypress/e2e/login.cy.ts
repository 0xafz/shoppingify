it('should fail login for non registered users', () => {
  cy.intercept('/api/users/login').as('login')
  cy.resetAndVisitLoginPage();

  cy.get('input[name=email]').type('test@test.com')
  cy.get('input[name=password]').type('dummy.pwd')

  cy.get('button[data-cy="submit"]').click()

  cy.wait('@login').then(({ response }) => {
    expect(response.statusCode).eq(400);
    expect(response.body).deep.equal({ "error": "User not found" });
  }).end()
})