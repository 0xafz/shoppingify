export const submitSignInForm = (email: string, password: string) => {
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)

  cy.get('button[data-cy=submit]').click()
}

export const submitSignUpForm = (email: string, password: string) => {
  cy.get('input[name=name]').type('Test user')
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)

  cy.get('button[data-cy=submit]').click()
}

export const clickAndConfirmDeleteAccount = () => {
  cy.get('button[data-cy=deleteMyAccount]').click()

  cy.get('button[data-cy="confirmAction"]').click()
}