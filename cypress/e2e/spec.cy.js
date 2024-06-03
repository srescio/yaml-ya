/* global cy */
describe('yaml ya', () => {
  describe('when loaded without saved templates', () => {
    it('should not display the select template dropdown, delete or export buttons', () => {
      cy.land()
      cy.get('select').should('not.exist')
      cy.get('button#yaml-delete').should('not.exist')
      cy.get('button#yaml-export').should('not.exist')
    })
  })

  it('should display the import button', () => {
    cy.land()
    cy.get('button#yaml-import').should('exist')
  })

  it('should display the name, replace and repeat fields', () => {
    cy.land()
    cy.get('input[name="yaml-name"]').should('exist')
    cy.get('input[name="yaml-replace"]').should('exist')
    cy.get('input[name="yaml-repeat"]').should('exist')
  })

  it('should display the textarea', () => {
    cy.land()
    cy.get('textarea#yaml-input').should('exist')
  })

  it('should display the process and reset buttons', () => {
    cy.land()
    cy.get('button#yaml-ya').should('exist')
    cy.get('button#yaml-reset').should('exist')
  })

  describe('the ya buttons should be disabled', () => {
    it('should be disabled when no yaml is entered', () => {
      cy.land()
      cy.get('button#yaml-ya').should('be.disabled')
    })

    it('should be disabled when no name is entered', () => {
      cy.land()
      cy.get('textarea#yaml-input').type('yaml')
      cy.get('input[name="yaml-name"]').clear()
      cy.get('button#yaml-ya').should('be.disabled')
    })

    it('should be disabled when no repeat is entered', () => {
      cy.land()
      cy.get('textarea#yaml-input').type('yaml')
      cy.get('input[name="yaml-repeat"]').clear()
      cy.get('button#yaml-ya').should('be.disabled')
    })

    it('should be disabled when no replace is entered', () => {
      cy.land()
      cy.get('textarea#yaml-input').type('yaml')
      cy.get('input[name="yaml-replace"]').clear()
      cy.get('button#yaml-ya').should('be.disabled')
    })
  })

  it('should display the processed yaml with default settings', () => {
    cy.land()
    cy.get('textarea#yaml-input').type('yaml$test')
    cy.get('button#yaml-ya').click()
    cy.get('pre').should('exist')
    cy.get('pre').should('have.text', 'yaml1test\nyaml2test\n');
  })

  it('should display the processed yaml with custom settings', () => {
    cy.land()
    cy.get('textarea#yaml-input').type('yaml&test')
    cy.get('input[name="yaml-replace"]').clear().type('&')
    cy.get('input[name="yaml-repeat"]').clear().type('3')
    cy.get('button#yaml-ya').click()
    cy.get('pre').should('exist')
    cy.get('pre').should('have.text', 'yaml1test\nyaml2test\nyaml3test\n');
  })
  
  it('after processing, the template should be saved and pre-selected, delete button should refer to selected template', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.get('select').should('exist')
    cy.get('select').should('have.value', name);
    cy.get('button#yaml-delete').should('contain', name);
  })

  it('saved templates should persist after reload', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.reload()
    cy.get('select').should('exist')
    cy.get('select').should('have.value', name);
  })

  it('reset button should deselect template and reset default values', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.get('button#yaml-reset').click()
    cy.get('select').should('have.value', '');
    cy.get('input[name="yaml-name"]').should('have.value', 'yaml_tpl');
    cy.get('input[name="yaml-replace"]').should('have.value', '$');
    cy.get('input[name="yaml-repeat"]').should('have.value', '2');
    cy.get('textarea#yaml-input').should('have.value', '');
    cy.get('button#yaml-ya').should('be.disabled');
    cy.get('pre').should('not.exist');
  })

  it('delete button should reset default values and make select disappear when only config is gone', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.get('button#yaml-delete').click()
    cy.get('select').should('not.exist');
    cy.get('button#yaml-export').should('not.exist');
    cy.get('input[name="yaml-name"]').should('have.value', 'yaml_tpl');
    cy.get('input[name="yaml-replace"]').should('have.value', '$');
    cy.get('input[name="yaml-repeat"]').should('have.value', '2');
    cy.get('textarea#yaml-input').should('have.value', '');
    cy.get('button#yaml-ya').should('be.disabled');
    cy.get('pre').should('not.exist');
  })

  it('deleted template should not be pre-selected after reload', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.get('button#yaml-delete').click()
    cy.reload()
    cy.get('select').should('not.exist');
  })

  it('template selection should update related fields', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.get('textarea#yaml-input').clear().type('yaml&test')
    cy.get('input[name="yaml-name"]').clear().type('name-test2')
    cy.get('input[name="yaml-replace"]').clear().type('&')
    cy.get('input[name="yaml-repeat"]').clear().type('3')
    cy.get('button#yaml-ya').click()
    cy.get('select').select(name)
    cy.get('input[name="yaml-name"]').should('have.value', name);
    cy.get('input[name="yaml-replace"]').should('have.value', '£');
    cy.get('input[name="yaml-repeat"]').should('have.value', '4');
    cy.get('textarea#yaml-input').should('have.value', 'yaml£test');
  })

  it('should update template config if saving with name of a saved template', () => {
    const name = 'name-test';
    cy.land()
    cy.fillAndYa(name)
    cy.get('input[name="yaml-name"]').clear().type(name)
    cy.get('input[name="yaml-repeat"]').clear().type('3')
    cy.get('button#yaml-ya').click()
    cy.get('button#yaml-reset').click();
    cy.get('select').select(name)
    cy.get('input[name="yaml-name"]').should('have.value', name);
    cy.get('input[name="yaml-replace"]').should('have.value', '£');
    cy.get('input[name="yaml-repeat"]').should('have.value', '3');
    cy.get('textarea#yaml-input').should('have.value', 'yaml£test');
  })

  describe('when loaded with saved templates', () => {
    it('should display the select template dropdown and export buttons', () => {
      cy.visit('/')
      cy.window().its('localStorage').invoke('setItem', 'yaml-templates', JSON.stringify([{ name: 'template1', yaml: 'yaml1' }]))
      cy.land()
      cy.get('select').should('exist')
      cy.get('button#yaml-export').should('exist')
    })
  })
})