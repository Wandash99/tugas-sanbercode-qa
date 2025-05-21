class directoryPage {

    elements = {
        employeeNameInput : () => cy.get("input[placeholder='Type for hints...']"),
        resetButton : () => cy.get("button[type='reset']"),
        searchButton : () => cy.get("button[type='submit']"),
        invalidError: () => cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message"),
        selectName: () => cy.get('.oxd-autocomplete-dropdown > *'),
        jobTitle: () => cy.get('[class="oxd-select-wrapper"]'),
        location: () => cy.get('[class="oxd-select-wrapper"]'),
        jobTitleDropdown: () => cy.get('[class="oxd-select-dropdown --positon-bottom"]'),
        locationDropdown: () => cy.get('[class="oxd-select-dropdown --positon-bottom"]'),
        cardName: () => cy.get('.oxd-text.oxd-text--p.orangehrm-directory-card-header.--break-words'),
        jobTitleInput: () => cy.get('.oxd-select-text-input'),
        locationInput: () => cy.get('.oxd-select-text-input')
    }

    //method for entering username
    enterEmployeeName(username)
    {
        this.elements.employeeNameInput().should('exist').and('have.value', '');
        this.elements.employeeNameInput().clear().type(username);
    }
    
    //method for clicking on reset button
    clickReset() {
        this.elements.resetButton().should('be.visible')
        this.elements.resetButton().click();
    }

    //method for clicking on search button
    clickSearch() {
        this.elements.searchButton().should('be.visible')
        this.elements.searchButton().click();
    }

    selectAutocomplete(name) {
        this.elements.selectName().should('be.visible')
        this.elements.selectName().contains(name).click()
    }

    selectFirstAutocomplete() {
        this.elements.selectName().should('be.visible')
        this.elements.selectName().click()
    }

    selectJobTitle(title) {
        this.elements.jobTitle().eq(0).click()
        this.elements.jobTitleDropdown().contains(title).click()
    }

    selectLocation(text) {
        this.elements.location().eq(1).click()
        this.elements.locationDropdown().contains(text).click()
    }

    checkEmployeeNameInput(text)
    {
        this.elements.employeeNameInput().should('exist').and('have.value', text);
    }

    checkJobTitleInput(text) {
        this.elements.jobTitleInput().eq(0).should('exist').and('contain', text);
    }

    checkLocationInput(text) {
        this.elements.locationInput().eq(1).should('exist').and('contain', text);
    }
    
}

export default directoryPage;