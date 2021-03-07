/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3080/api/testing/reset');
    const newUser = {
      name: 'root',
      email: 'root@email.com',
      username: 'root',
      password1: '12345678',
      password2: '12345678',
    };
    cy.request('POST', 'http://localhost:3080/api/users', newUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('html')
      .should('contain', 'Login now');
    cy.get('#loginUsername');
    cy.get('#loginPassword');
    cy.get('#loginButton');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#loginUsername').type('root');
      cy.get('#loginPassword').type('12345678');
      cy.get('#loginButton').click();
      cy.get('html').should('contain', 'Hello, root');
    });
    it('fails with wrong credentials', function () {
      cy.get('#loginUsername').type('roots');
      cy.get('#loginPassword').type('12345678');
      cy.get('#loginButton').click();
      cy.get('html').should('not.contain', 'Hello, root');
      cy.get('html').should('contain', 'Wrong credentials');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: '12345678' });
    });

    it('a new post can be created', function () {
      cy.get('#new-post').click();
      cy.get('#title').type('test post 1');
      cy.get('#content').type('testing content writing');
      cy.get('#postSubmit').click();
      cy.get('html')
        .should('contain', 'test post 1')
        .and('contain', 'testing content writing')
        .and('contain', 'Post "test post 1" successfully created');
    });
  });

  describe('When there are posts initially + logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: '12345678' });
      cy.createPost({ title: 'new post', content: 'new post content' });
    });

    it('post can be liked', function () {
      cy.get('.postDetails').should('contain', 'likes: 0');
      cy.get('#likeButton').click();
      cy.get('.postDetails').should('contain', 'likes: 1');
    });
  });
});
