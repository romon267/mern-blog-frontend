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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#loginUsername').type(username);
  cy.get('#loginPassword').type(password);
  cy.get('#loginButton').click();
  cy.get('html').should('contain', 'Hello, root');
});

Cypress.Commands.add('createPost', ({ title, content }) => {
  cy.request({
    url: 'http://localhost:3080/api/posts',
    method: 'POST',
    body: { title, content },
    headers: {
      // eslint-disable-next-line quote-props
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInBlogappUser')).token}`,
    },
  });
  cy.visit('http://localhost:3000');
});
