describe('Scenario Login', () => {
  it('Berhasil Login', () => {
    const username = "Admin"
    const password = "admin123"
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[placeholder='Username']").clear().type(username)
    cy.get("input[placeholder='Password']").clear().type(password)
    cy.get("button[type='submit']").click()
  })
})

describe('Scenario Dashboard', () => {
  it('Cari dan Masuk ke Menu Admin', () => {
    const admin = "Admin"
    const password = "admin123"
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[placeholder='Username']").clear().type(admin)
    cy.get("input[placeholder='Password']").clear().type(password)
    cy.get("button[type='submit']").click()

    cy.get("input[placeholder='Search']").clear().type(admin)
    cy.get('.oxd-main-menu-item-wrapper').first().click()
  })
})