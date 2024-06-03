// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* global Cypress */
/* global cy */

Cypress.Commands.add('land', () => {
    cy.visit('/')
    cy.wait(100)
})
Cypress.Commands.add('fillAndYa', (name) => {
    cy.get('textarea#yaml-input').type('yaml£test')
    cy.get('input[name="yaml-name"]').clear().type(name)
    cy.get('input[name="yaml-replace"]').clear().type('£')
    cy.get('input[name="yaml-repeat"]').clear().type('4')
    cy.get('button#yaml-ya').click()
})