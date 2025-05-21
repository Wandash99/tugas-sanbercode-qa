describe('Scenario Login', () => {
    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const username = 'Admin'
    const password = 'admin123'
    const wrongUsername = 'NotAdmin'
    const wrongPassword = 'wrongpassword'
    const validateUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate'

    beforeEach(() => {
        cy.visit(loginUrl)
    })

    it('Berhasil Login', () => {
      cy.intercept('POST', validateUrl).as('validateRequest')
      cy.get("input[placeholder='Username']").should('exist').and('have.value', '')
      cy.get("input[placeholder='Username']").type(username)
      cy.get("input[placeholder='Password']").should('exist').and('have.value', '')
      cy.get("input[placeholder='Password']").type(password)
      cy.get("button[type='submit']").should('be.visible')
      cy.get("button[type='submit']").click()

      // cek url setelah login
      cy.url().should('include', '/dashboard/index')
      cy.wait('@validateRequest').its('response.statusCode').should('eq', 302)
    })
  
    it('Invalid Credentials Wrong Username', () => {
      cy.intercept('POST', validateUrl).as('validateRequest')
      cy.get("input[placeholder='Username']").should('exist').and('have.value', '')
      cy.get("input[placeholder='Username']").type(wrongUsername)
      cy.get("input[placeholder='Password']").should('exist').and('have.value', '')
      cy.get("input[placeholder='Password']").type(password)
      cy.get("button[type='submit']").should('be.visible')
      cy.get("button[type='submit']").click()

      // error credential
      cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should('be.visible').and('contain', 'Invalid credentials')
      cy.wait('@validateRequest').its('response.statusCode').should('eq', 302)
    })

    it('Invalid Credentials Wrong Password', () => {
        cy.intercept('POST', validateUrl).as('validateRequest')
        cy.get("input[placeholder='Username']").should('exist').and('have.value', '')
        cy.get("input[placeholder='Username']").type(username)
        cy.get("input[placeholder='Password']").should('exist').and('have.value', '')
        cy.get("input[placeholder='Password']").type(wrongPassword)
        cy.get("button[type='submit']").should('be.visible')
        cy.get("button[type='submit']").click()
  
        // error credential
        cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should('be.visible').and('contain', 'Invalid credentials')
        cy.wait('@validateRequest').its('response.statusCode').should('eq', 302)
      })

    it('Empty credentials', () => {        
        cy.get("input[placeholder='Username']").should('exist').and('have.value', '')
        cy.get("input[placeholder='Password']").should('exist').and('have.value', '')
        cy.get("button[type='submit']").should('be.visible')
        cy.get("button[type='submit']").click()
  
        // error credential
        cy.get("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)").should('be.visible').and('contain', 'Required')
        
      })
  })