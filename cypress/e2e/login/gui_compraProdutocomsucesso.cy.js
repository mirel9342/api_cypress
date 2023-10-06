/// <reference types ="Cypress" />

describe('Teste E2E - Realizando a comprar de produtos com sucesso ', () => {
    it('Fluxo da compra de produtos', () => {
        cy.visit("https://www.saucedemo.com/ ")
    
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain', 'Products')  

        // ordenação de produtos de menor para maior valor:
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
       // valisdação da ordenação desse produtos : do menor para o maior 
        cy.get(':nth-child(1) > .inventory_item_description').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_description').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_description').should('contain','Sauce Labs Bolt T-Shirt')

        // adcionar os produtos no carrinho   
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click() 
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click() 
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        // Checagem da quantidade de produtos adcionados no carrinho 
        cy.get('.shopping_cart_link').should('have.text', '3')  // have.text-> vai validar se existir examente 3 produtos no carrinho.

        //check verificar se os produtos entao no carrinho
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_list > :nth-child(3)').should('contain','Sauce Labs Onesie')
        cy.get('.cart_list > :nth-child(4)').should('contain','Sauce Labs Bike Light')
        cy.get('.cart_list > :nth-child(5)').should('contain','Sauce Labs Bolt T-Shirt')

        // checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type("Mireli")
        cy.get('[data-test="lastName"]').type("teste o ultimo nome")
        cy.get('[data-test="postalCode"]').type("53424316839")
        cy.get('[data-test="continue"]').click()

       //verificando bo valor total do carrinho:

        cy.get('.cart_list > :nth-child(3)').should('contain','Sauce Labs Onesie')
        cy.get('.cart_list > :nth-child(4)').should('contain','Sauce Labs Bike Light')
        cy.get('.cart_list > :nth-child(5)').should('contain','Sauce Labs Bolt T-Shirt')

        //checagem do valor total:
        cy.get('.summary_total_label').should('have.text','Total: $36.69')
        cy.get('[data-test="finish"]').click()
         
        

    }); 
});
 