import loginPage from './loginPage';

describe('Login page', () => {
    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const username = 'Admin'
    const password = 'admin123'
    const wrongUsername = 'NotAdmin'
    const wrongPassword = 'wrongpassword'

    beforeEach(() => {
        cy.visit(loginUrl)
    })

    it('Login Successfully', () => {
      const loginObj = new loginPage()
      
      loginObj.enterUsername(username)
      loginObj.enterPassword(password)
      loginObj.clickSubmit()

      // cek url setelah login
      cy.url().should('include', '/dashboard/index')
    })
  
    it('Invalid Credentials Wrong Username', () => {
      const loginObj = new loginPage()

      loginObj.enterUsername(wrongUsername)
      loginObj.enterPassword(password)
      loginObj.clickSubmit()

      // error credential
      loginObj.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials')
    })

    it('Invalid Credentials Wrong Password', () => {
        const loginObj = new loginPage()

        loginObj.enterUsername(username)
        loginObj.enterPassword(wrongPassword)
        loginObj.clickSubmit()
  
        // error credential
        loginObj.elements.errorMessage().should('be.visible').and('contain', 'Invalid credentials')
      })

    it('Empty Credentials', () => {        
        const loginObj = new loginPage()
        
        loginObj.clickSubmit()
  
        // error credential
        loginObj.elements.requiredError().should('be.visible').and('contain', 'Required')
      })
})
