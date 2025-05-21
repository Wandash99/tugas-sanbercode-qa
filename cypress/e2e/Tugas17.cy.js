import loginPage from './loginPage';

describe('Login page', () => {
    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const username = 'Admin'
    const password = 'admin123'
    const wrongUsername = 'NotAdmin'
    const wrongPassword = 'wrongpassword'
    const validateUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate'

    beforeEach(() => {
        cy.visit(loginUrl)
    })

    it('Login Successfully', () => {
      const loginObj = new loginPage()

      cy.intercept('POST', validateUrl).as('validateRequest')
      
      loginObj.enterUsername(username)
      loginObj.enterPassword(password)
      loginObj.clickSubmit()

      // cek url setelah login
      cy.url().should('include', '/dashboard/index')
      cy.wait('@validateRequest').its('response.statusCode').should('eq', 302)
    })
  
    it('Invalid Credentials Wrong Username', () => {
      const loginObj = new loginPage()

      cy.intercept('POST', validateUrl).as('validateRequest')

      loginObj.enterUsername(wrongUsername)
      loginObj.enterPassword(password)
      loginObj.clickSubmit()

      // error credential
      loginObj.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials')
      cy.wait('@validateRequest').its('response.statusCode').should('eq', 302)
    })

    it('Invalid Credentials Wrong Password', () => {
        const loginObj = new loginPage()

        cy.intercept('POST', validateUrl).as('validateRequest')

        loginObj.enterUsername(username)
        loginObj.enterPassword(wrongPassword)
        loginObj.clickSubmit()
  
        // error credential
        loginObj.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials')
        cy.wait('@validateRequest').its('response.statusCode').should('eq', 302)
      })

    it('Empty Credentials', () => {        
        const loginObj = new loginPage()
        
        loginObj.clickSubmit()
  
        // error credential
        loginObj.elements.requiredError().should('be.visible').and('contain', 'Required')
        
      })
  })