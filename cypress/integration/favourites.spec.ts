describe('the favourites feature', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers/random',
      'fixture:randomBier.json'
    );

    cy.visit('/');
  });

  it('should mark a favourite', () => {
    cy.get('[data-cy="favourite"]').click();

    cy.get('[data-cy="heartImg"]')
      .should('have.attr', 'alt')
      .should('include', 'full heart');
  });

  it('should add and remove favourites', () => {
    cy.get('[data-cy="favourite"]').click();

    cy.get('[data-cy="badge"]').should('contain', '1');

    cy.get('[data-cy="favourites-link"]').click();

    cy.contains('Alpha Dog');

    cy.get('[data-cy="favourite"]').click();

    cy.get('[data-cy="badge"]').should('contain', '0');

    cy.contains(`You don't have any favourites!`);

    cy.contains('Home').click();

    cy.get('[data-cy="heartImg"]')
      .should('have.attr', 'alt')
      .should('include', 'blank heart');
  });

  it('should retrieve favourites from localStorage', () => {
    cy.fixture('localBiers.json').then((biers) => {
      localStorage.favourites = JSON.stringify(biers);
    });

    cy.visit('/favourites');

    cy.get('[data-cy="bier-card"]').should('have.length', 3);
  });

  it('should display favourite biers first in search', () => {
    cy.fixture('localBiers.json').then((biers) => {
      localStorage.favourites = JSON.stringify(biers);
    });

    cy.server();

    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?abv_lt=55.1&abv_gt=0&food=salmon&per_page=50',
      'fixture:salmonSearch.json'
    ).as('search');

    cy.visit('/favourites');

    cy.get('[data-cy="home-link"]').click();

    cy.get('[data-cy="food"]')
      .type('salmon')
      .wait('@search')
      .get('[data-cy="bier-card"]')
      .first()
      .should('contain', 'Sub Hop');
  });
});
