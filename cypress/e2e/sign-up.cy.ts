const USER = {
  name: 'test user1',
  password: 'dummy.pwd',
  email: 'sdf11sssss1lss2@test.com'
}

it('should allow users signup', () => {
  cy.signUpViaUI(USER.email, USER.password);
})

it('should allow users to delete their account', () => {
  cy.signUpViaUI(USER.email, USER.password);

  cy.deleteAccountViaUI();

  cy.loginViaUI(USER.email, USER.password)

  cy.contains('h1', 'Sign In')
})
