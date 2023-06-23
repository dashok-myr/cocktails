describe('Home', () => {
  it('should opne home page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('input').type('Margarita')
    cy.get('a[href="cocktail/11118"]').click()

    cy.get('img[alt="cocktail"]').should('be.visible')

    cy.get('div').contains('Tequila').should('exist')
    cy.get('div').contains('Blue Curacao').should('exist')
    cy.get('div').contains('Lime juice').should('exist')
    cy.get('div').contains('Salt').should('exist')

    cy.get('canvas[role="img"]').should('exist')

    cy.get('div')
      .contains(
        'Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.'
      )
      .should('exist')
  })
})
