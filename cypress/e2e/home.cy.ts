describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the welcome message', () => {
    cy.get('#Home-title').should('contain', 'Bienvenue sur Trélo');
    cy.get('#Home-title_text').should('contain', 'Organisez vos projets et tâches efficacement');
  });

  it('should display the button to create a new board', () => {
    cy.get('#Add-table-btn').should('contain', 'Créer un nouveau tableau super bô');
  });

  it('should open the modal when the create board button is clicked', () => {
    cy.get('#Add-table-btn').click();
    cy.get('app-add-board-modale').should('exist');
  });

  it('should display boards if they exist', () => {
    cy.get('#board-card').should('have.length.greaterThan', 0);
  });

  it('should redirect to the board details page when a board is clicked', () => {
    cy.get('#board-card').first().click();
    cy.url().should('include', '/board/');
  });
});