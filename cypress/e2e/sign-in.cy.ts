import { Users } from "../support/constants";
import { submitSignInForm } from "../utils/auth";

const User2 = Users.user2;

describe('Sign in', () => {
  it('should fail sign in for non registered users', () => {
    cy.visit('/user/sign-in');

    submitSignInForm(User2.email, User2.password)

    // should stay on sign in page
    cy.contains('Sign In').should('be.visible')
  })

})