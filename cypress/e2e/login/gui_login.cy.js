/// <reference types ="Cypress" />

const { getMaxListeners } = require("process");


describe('teste funcional de login ', () => {
    
    it('deve realizar um login com sucesso', () => {
        cy.login_teste('standard_user', 'secret_sauce')
        cy.get('.title').should('contain', 'Products') /// should->metado de acessão (deve conter)

    }); 
    
    it('validano login incorreto ', () => {
        cy.login_teste('incorreto', 'secret_sauce')      
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
     

    });  
    it('validano senha incorreta', () => {
        cy.login_teste('standard_user', 'incorreta')
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')

    });  
});
