class resetPasswordPage {

    elements = {
        usernameInput : () => cy.get("input[placeholder='Username']"),      
        cancelButton : () => cy.get("button[type='button']"),
        resetButton : () => cy.get("button[type='submit']"),
        requiredError: () => cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message"),
        forgotPasswordLink : () => cy.get(".oxd-text.oxd-text--p.orangehrm-login-forgot-header"),
        resetPasswordSent : () => cy.get(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title")   
    }

    //method for entering username
    enterUsername(username)
    {
        this.elements.usernameInput().should('exist').and('have.value', '');
        this.elements.usernameInput().clear().type(username);
    }

    
    //method for clicking on reset button
    clickReset() {
        this.elements.resetButton().should('be.visible')
        this.elements.resetButton().click();
    }

    //method for clicking on forgot password button
    clickForgotPassword() {
        this.elements.forgotPasswordLink().should('be.visible')
        this.elements.forgotPasswordLink().click();
    }

    //method for clicking on cancel button
    clickCancel() {
        this.elements.cancelButton().should('be.visible')
        this.elements.cancelButton().click();
    }
    
}

export default resetPasswordPage;