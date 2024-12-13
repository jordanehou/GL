describe('Tests d\'authentification et de navigation', () => {
    const baseUrl = 'https://the-internet.herokuapp.com';
  
    before(() => {
      // Accéder au site avant les tests
      cy.visit(baseUrl);
    });
  
    it('Devrait se connecter avec des identifiants valides', () => {
      // Naviguer vers la page de connexion
      cy.contains('Form Authentication').click();
  
      // Vérifier que nous sommes sur la page de connexion
      cy.url().should('include', '/login');
  
      // Entrer les identifiants valides
      cy.get('#username').type('tomsmith'); // Nom d'utilisateur valide fourni par le site
      cy.get('#password').type('SuperSecretPassword!'); // Mot de passe valide fourni par le site
  
      // Soumettre le formulaire
      cy.get('.radius').click();
  
      // Vérifier que la connexion a réussi
      cy.url().should('include', '/secure');
      cy.get('.flash.success').should('contain', 'You logged into a secure area!');
    });
  
    it('Devrait afficher un message d\'erreur avec des identifiants invalides', () => {
      // Retourner à la page de connexion
      cy.visit(`${baseUrl}/login`);
  
      // Entrer des identifiants invalides
      cy.get('#username').type('invalidUser');
      cy.get('#password').type('invalidPassword');
  
      // Soumettre le formulaire
      cy.get('.radius').click();
  
      // Vérifier que la connexion a échoué
      cy.get('.flash.error').should('contain', 'Your username is invalid!');
    });
  
    it('Devrait naviguer correctement vers une autre page', () => {
      // Retourner à la page principale
      cy.visit(baseUrl);
  
      // Naviguer vers la page "Checkboxes"
      cy.contains('Checkboxes').click();
  
      // Vérifier que nous sommes sur la page des Checkboxes
      cy.url().should('include', '/checkboxes');
  
      // Vérifier la présence des cases à cocher
      cy.get('input[type="checkbox"]').should('have.length', 2);
    });


    it('Devrait naviguer correctement vers une autre page', () => {
      // Retourner à la page principale
      cy.visit(baseUrl);
  
      // Naviguer vers la page "images"
      cy.contains('Broken Images').click();
  
      // Vérifier que nous sommes sur la page des images
      cy.url().should('include', '/broken_images');
  
    });

    it('Devrait naviguer correctement vers une autre page', () => {
      // Retourner à la page principale
      cy.visit(baseUrl);
  
      // Naviguer vers la page "Dropdown"
      cy.contains('Dropdown').click();
  
      // Vérifier que nous sommes sur la page des liens
      cy.url().should('include', '/dropdown');
  
    });

  });
  