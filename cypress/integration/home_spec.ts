describe('the home page', () => {
  beforeEach(() => {
    cy.server();

    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers/random',
      'fixture:randomBier.json'
    );

    cy.route(
      'GET',
      'https://api.punkapi.com/v2/beers?per_page=50',
      'fixture:browse.json'
    );

    cy.visit('/');
  });

  it('should display a random bier on load', () => {
    cy.get('[data-cy="bier-card"]')
      .should('have.length', 1)
      .contains('Alpha Dog');
  });

  it('should navigate to favourites', () => {
    cy.get('[data-cy="favourites-link"]').click();

    cy.url().should('include', '/favourites');
  });

  it('should navigate to about', () => {
    cy.get('[data-cy="about-link"]').click();

    cy.url().should('include', '/about');
  });

  it('should browse biers', () => {
    cy.contains('Browse').click();

    cy.get('[data-cy="bier-card"]').should('have.length', 50);
  });

  it('should show a surprise bier', () => {
    cy.contains('Surprise').click();

    cy.get('[data-cy="bier-card"]')
      .should('have.length', 1)
      .contains('Alpha Dog');
  });
});
