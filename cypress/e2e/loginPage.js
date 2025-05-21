class loginPage {

    elements = {
        usernameInput : () => cy.get("input[placeholder='Username']"),      
        passwordInput : () => cy.get("input[placeholder='Password']"),    
        submitBtn : () => cy.get("button[type='submit']"),
        errorMessage : () => cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text"),
        requiredError: () => cy.get("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)"),
    }

    //method for entering username
    enterUsername(username)
    {
        this.elements.usernameInput().should('exist').and('have.value', '');
        this.elements.usernameInput().clear().type(username);
    }

    //method for entering password
    enterPassword(password)
    {
        this.elements.passwordInput().should('exist').and('have.value', '');
        this.elements.passwordInput().clear().type(password);
    }

    //method for clicking on submit button
    clickSubmit() {
        this.elements.submitBtn().should('be.visible')
        this.elements.submitBtn().click();
    }
    
}

export default loginPage;