/* global cy */
describe('yaml ya', () => {
  describe('when loaded without saved templates', () => {
    it('should not display the select template dropdown, delete or export buttons', () => {
      cy.visit('/')
      cy.wait(100)
      cy.get('select').should('not.exist')
      cy.get('button#yaml-delete').should('not.exist')
      cy.get('button#yaml-export').should('not.exist')
    })
  })

  it('should display the import button', () => {
    cy.visit('/')
    cy.wait(100)
    cy.get('button#yaml-import').should('exist')
  })

  it('should display the name, replace and repeat fields', () => {
    cy.visit('/')
    cy.wait(100)
    cy.get('input[name="yaml-name"]').should('exist')
    cy.get('input[name="yaml-replace"]').should('exist')
    cy.get('input[name="yaml-repeat"]').should('exist')
  })

  it('should display the textarea', () => {
    cy.visit('/')
    cy.wait(100)
    cy.get('textarea#yaml-input').should('exist')
  })
})