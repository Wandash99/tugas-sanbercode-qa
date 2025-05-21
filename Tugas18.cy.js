describe('Reqres API Testing', () => {

    const auth = {'x-api-key': 'reqres-free-v1'}
    
    it('Get List User', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/users?page=2',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Get Single User', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/users/2', 
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Get Single Not Found', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/users/23',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.not.be.null
        })
    })

    it('Get List Resource', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/unknown', 
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Get Single Resource', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/unknown/2', 
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Get Single Not Found', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/unknown/23',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.not.be.null
        })
    })

    it('Create', () => {
        cy.request({
            headers: auth,
            method: 'POST', 
            url:'https://reqres.in/api/unknown/2', 
            body: {
                "name": "morpheus",
                "job": "leader"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.not.be.null
            expect(response.body.name).to.eq("morpheus")
        })
    })

    it('Update [PUT]', () => {
        cy.request({
            headers: auth,
            method: 'PUT', 
            url:'https://reqres.in/api/users/2', 
            body: {
                "name": "morpheus",
                "job": "leaders"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.job).to.eq("leaders")
        })
    })

    it('Update [PATCH]', () => {
        cy.request({
            headers: auth,
            method: 'PATCH', 
            url:'https://reqres.in/api/users/2', 
            body: {
                "name": "morpheus",
                "job": "leaders"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.job).to.eq("leaders")
        })
    })

    it('Delete', () => {
        cy.request({
            headers: auth,
            method: 'DELETE', 
            url:'https://reqres.in/api/users/2', 
            body: {
                "name": "morpheus",
                "job": "leaders"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(204)
          
        })
    })

    it('Register Successful', () => {
        cy.request({
            headers: auth,
            method: 'POST', 
            url:'https://reqres.in/api/register', 
            body: {
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Register Unsuccessful', () => {
        cy.request({
            headers: auth,
            method: 'POST', 
            url:'https://reqres.in/api/register', 
            body: {
                "email": "eve.holt@reqres.in"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.not.be.null
            expect(response.body.error).to.eq("Missing password")
        })
    })

    it('Login Successful', () => {
        cy.request({
            headers: auth,
            method: 'POST', 
            url:'https://reqres.in/api/login', 
            body: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Login Unsuccessful', () => {
        cy.request({
            headers: auth,
            method: 'POST', 
            url:'https://reqres.in/api/login', 
            body: {
                "email": "peter@klaven"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.not.be.null
            expect(response.body.error).to.eq("Missing password")
        })
    })

    it('Delayed Response', () => {
        cy.request({
            headers: auth,
            method: 'GET', 
            url:'https://reqres.in/api/users?delay=3',
            timeout: 4000
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

})