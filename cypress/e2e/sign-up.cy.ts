import { Users } from "../support/constants"
import { clickAndConfirmDeleteAccount, submitSignInForm, submitSignUpForm } from "../utils/auth"

const User1 = Users.user1;

describe('Sign up page', {
  testIsolation: true
}, () => {
  context('XL screen', () => {
    beforeEach(() => {
      cy.setScreenSize('xl')
    })
    it('should allow users signup', () => {
      cy.visit('/')

      cy.visit('/user/sign-up')

      submitSignUpForm(User1.email, User1.password)

      cy.contains('h1', 'Shoppingify allows you take your shopping list wherever you go').should('be.visible')

      cy.get('input[placeholder="search item"]').should('be.visible')
    })

    it('should allow users to delete their account', () => {
      cy.visit('/')

      cy.visit('/user/sign-in')

      submitSignInForm(User1.email, User1.password)

      cy.visit('/user')

      clickAndConfirmDeleteAccount()

      cy.visit('/user/sign-in')

      submitSignInForm(User1.email, User1.password)

      cy.contains('h1', 'Sign In').should('be.visible')
    })
  })

  context('SM screen', () => {
    beforeEach(() => {
      cy.setScreenSize('sm')
    })

    it('should allow users signup', () => {
      cy.visit('/user/sign-up')

      submitSignUpForm(User1.email, User1.password)

      cy.get('input[placeholder="search item"]').should('be.visible')
    })

    it('should allow users to delete their account', () => {
      cy.visit('/user/sign-in')

      submitSignInForm(User1.email, User1.password)

      cy.visit('/user')

      clickAndConfirmDeleteAccount()

      cy.visit('/user/sign-in')

      submitSignInForm(User1.email, User1.password)

      cy.contains('h1', 'Sign In').should('be.visible')
    })
  })
})
