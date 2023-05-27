const USER = {
  name: 'test user1',
  password: 'dummy.pwd',
  email: 'test54sssdfwsd@test.com'
}

it('should allow users signup', () => {
  cy.signUpViaUI(USER.email, USER.password).end();
})

it('should allow users to delete their account', () => {
  // TODO
})
