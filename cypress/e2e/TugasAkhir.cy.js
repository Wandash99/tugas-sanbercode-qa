import loginPage from './loginPage';
import resetPasswordPage from './resetPasswordPage';
import directoryPage from './directoryPage';

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

describe('Reset Password Page', () => {
    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const username = 'Admin'
    const sendPasswordResetUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset'
    const requestPasswordResetUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode'

    beforeEach(() => {
        cy.visit(loginUrl)
    })

    it('Succes Reset Password', () => {        
        const resetPasswordPageObject = new resetPasswordPage()

        resetPasswordPageObject.clickForgotPassword()

        // cek url reset password
        cy.url().should('eq', requestPasswordResetUrl)

        resetPasswordPageObject.enterUsername(username)
        resetPasswordPageObject.clickReset()

        // cek url reset password
        cy.url().should('eq', sendPasswordResetUrl)
        
        resetPasswordPageObject.elements.resetPasswordSent().should('be.visible')
        
      })

      it('Error Reset Password', () => {        
        const resetPasswordPageObject = new resetPasswordPage()

        resetPasswordPageObject.clickForgotPassword()

        // cek url reset password
        cy.url().should('eq', requestPasswordResetUrl)

        resetPasswordPageObject.clickReset()

        resetPasswordPageObject.elements.requiredError().should('be.visible')
        
      })

      it('Cancel Reset Password', () => {        
        const resetPasswordPageObject = new resetPasswordPage()

        resetPasswordPageObject.clickForgotPassword()

        // cek url reset password
        cy.url().should('eq', requestPasswordResetUrl)

        resetPasswordPageObject.clickCancel()

        // kembali ke halaman login
        cy.url().should('eq', loginUrl)
      })
    
})

describe('Directory Page', () => {

    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const username = 'Admin'
    const password = 'admin123'
    const directoryUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory'
    const employeeName = 'Sara Tencrady';

    beforeEach(() => {
        cy.visit(loginUrl)
        const loginObj = new loginPage()

        loginObj.enterUsername(username)
        loginObj.enterPassword(password)
        loginObj.clickSubmit()

        cy.visit(directoryUrl)
    })

    it('Search Employee Name', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.enterEmployeeName('sara')
        directoryPageObject.selectAutocomplete(employeeName)
        directoryPageObject.clickSearch()

        directoryPageObject.elements.cardName().contains(employeeName)
    })

    it('Search Employee Job Title', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.selectJobTitle('Payroll Administrator')
        directoryPageObject.clickSearch()
        
        directoryPageObject.elements.cardName().contains(employeeName)
    })

    it('Search Employee Location', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.selectLocation('Texas R&D')
        directoryPageObject.clickSearch()
        
        directoryPageObject.elements.cardName().contains(employeeName)
    })

    it('Search Employee Combination', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.enterEmployeeName('sara')
        directoryPageObject.selectAutocomplete(employeeName)
        directoryPageObject.selectJobTitle('Payroll Administrator')
        directoryPageObject.selectLocation('Texas R&D')
        directoryPageObject.clickSearch()

        directoryPageObject.elements.cardName().contains(employeeName)
    })

    it('Search Employee with wrong combination', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.enterEmployeeName('asdasdasdasdasd')
        directoryPageObject.selectFirstAutocomplete()
        directoryPageObject.clickSearch()

        directoryPageObject.elements.invalidError().should('be.visible')
    })

    it('Search Employee with no input', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.clickSearch()

        directoryPageObject.elements.cardName().should('be.visible')
    })

    it('Reset Search Employee input', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.enterEmployeeName('sara')
        directoryPageObject.selectAutocomplete(employeeName)
        directoryPageObject.selectJobTitle('Payroll Administrator')
        directoryPageObject.selectLocation('Texas R&D')
        directoryPageObject.clickReset()

        directoryPageObject.checkEmployeeNameInput('')
        directoryPageObject.checkJobTitleInput('-- Select --')
        directoryPageObject.checkLocationInput('-- Select --')

        directoryPageObject.elements.cardName().should('be.visible')
    })

    it('Reset Search Employee input and then search', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.enterEmployeeName('sara')
        directoryPageObject.selectAutocomplete(employeeName)
        directoryPageObject.selectJobTitle('Payroll Administrator')
        directoryPageObject.selectLocation('Texas R&D')
        directoryPageObject.clickReset()

        directoryPageObject.checkEmployeeNameInput('')
        directoryPageObject.checkJobTitleInput('-- Select --')
        directoryPageObject.checkLocationInput('-- Select --')
        directoryPageObject.clickSearch()

        directoryPageObject.elements.cardName().should('be.visible')
    })

    it('Reset Search without input', () => {        
        const directoryPageObject = new directoryPage()

        directoryPageObject.clickReset()

        directoryPageObject.checkEmployeeNameInput('')
        directoryPageObject.checkJobTitleInput('-- Select --')
        directoryPageObject.checkLocationInput('-- Select --')

        directoryPageObject.elements.cardName().should('be.visible')
    })
})