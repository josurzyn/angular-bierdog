describe('the search feature', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers/random',
      'fixture:randomBier.json'
    );

    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?abv_lt=55.1&abv_gt=4.9&per_page=50',
      'fixture:minSearch.json'
    );
    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?abv_lt=50.1&abv_gt=0&per_page=50',
      'fixture:maxSearch.json'
    );
    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?abv_lt=55.1&abv_gt=0&beer_name=Wheat&per_page=50',
      'fixture:wheatSearch.json'
    );
    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?abv_lt=55.1&abv_gt=0&food=pizza&per_page=50',
      'fixture:pizzaSearch.json'
    );
    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?abv_lt=55.1&abv_gt=0&food=shrimps&per_page=50',
      '[]'
    );
    cy.visit('/');
  });

  it('should edit min slider', () => {
    cy.get('[data-cy="min"]')
      .focus()
      .type(
        '{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}'
      );
    cy.get('[data-cy="min-label"]').should('have.text', '5% Min ABV');

    cy.get('[data-cy="bier-card"]').should('have.length', 40);
  });

  it('should edit max slider', () => {
    cy.get('[data-cy="max"]')
      .focus()
      .type(
        '{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}'
      );
    cy.get('[data-cy="max-label"]').should('have.text', '50% Max ABV');

    cy.get('[data-cy="bier-card"]').should('have.length', 43);
  });

  it('should search by style', () => {
    cy.get('[data-cy="style"]')
      .click()
      .get('mat-option')
      .contains('Wheat')
      .click();

    cy.get('[data-cy="bier-card"]').as('biers').should('have.length', 2);

    cy.get('@biers')
      .get('[data-cy="bier-name"]:contains(Wheat)')
      .should('have.length', 2);
  });

  it('should search with food input', () => {
    cy.get('[data-cy="food"]').type('pizza');

    cy.get('[data-cy="bier-card"]').as('biers').should('have.length', 7);

    cy.get('@biers')
      .get(
        '[data-cy="food-match"]:contains(pizza), [data-cy="food-match"]:contains(Pizza)'
      )
      .should('have.length', 7);
  });

  it('should display error when no results', () => {
    cy.get('[data-cy="food"]').type('shrimps');

    cy.contains('Oops');
  });
});
