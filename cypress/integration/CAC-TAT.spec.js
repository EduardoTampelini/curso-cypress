/// <reference types="cypress"/>



describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html');
       
      })
    it('preenche os campos obrigatórios e envia o formulário',function(){
        cy.get('#firstName').type('eduardo');
        cy.get('#lastName').type('tampelini');
        cy.get('#email').type('ezafalon@gamil.com');
        cy.get('#phone').type('4499770');
        cy.get('#open-text-area').type('apenas para testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', {delay: 0});
        cy.contains('button','Enviar').click();
        cy.get('.success').should('be.visible');
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
      cy.get('#firstName').type('eduardo');
      cy.get('#lastName').type('tampelini');
      cy.get('#email').type('ezafalon2gamil.com');
      cy.get('#phone').type('4499770');
      cy.get('#open-text-area').type('apenas para teste', {delay: 0});
      cy.contains('button','Enviar').click();
      cy.get('.error').should('be.visible')
  })
  it('numero de telefone invalido',function(){
    cy.get('#firstName').type('eduardo');
    cy.get('#lastName').type('tampelini');
    cy.get('#email').type('ezafalon@gamil.com');
    cy.get('#phone').type('gtestest').should('be.empty');
    cy.get('#open-text-area').type('apenas para teste', {delay: 0});
    cy.contains('button','Enviar').click();
    
})
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('eduardo');
    cy.get('#lastName').type('tampelini');
    cy.get('#email').type('ezafalon@gamil.com');
    cy.get('#open-text-area').type('apenas para teste', {delay: 0});
    cy.get('#phone-checkbox').check();
    cy.contains('button','Enviar').click();
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName').type('eduardo').should('have.value', 'eduardo').clear().should('be.empty');
    cy.get('#lastName').type('tampelini').should('have.value', 'tampelini').clear().should('be.empty');
    cy.get('#email').type('ezafalon@gamil.com').should('have.value', 'ezafalon@gamil.com').clear().should('be.empty');
    cy.get('#phone').type('4499770').should('have.value', '4499770').clear().should('be.empty');

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
    cy.get('.button').click();
    cy.get('.error').should('be.visible');
  })
  it('envia o formuário com sucesso usando um comando customizado', ()=>{
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
  })
  it('seleciona um produto (YouTube) por seu texto',()=>{
    cy.SelectTeste('youtube').should('have.value','youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)',()=>{
    cy.SelectTeste('mentoria').should('have.value','mentoria');
  })
  it('seleciona um produto (Blog) por seu índice',()=>{
    cy.SelectTeste(1).should('have.value','blog');
  })
  it('marca o tipo de atendimento "Feedback"', ()=>{
    cy.get(':nth-child(4) > input').check().should('be.checked')
  })
  it('marca cada tipo de atendimento',()=>{
    cy.get('input[type=radio]').should('have.length',3).each((radio)=>{
      cy.wrap(radio).check().should('be.checked');
    })
  })
  it('marca ambos checkboxes, depois desmarca o último',()=>{
    cy.get('input[type=checkbox]').should('have.length',2).each((check)=>{
      cy.wrap(check).check().should('be.checked');
    })
    cy.get('input[type=checkbox]').last().uncheck().should('not.be.checked');
  })
  it('seleciona um arquivo da pasta fixtures',()=>{
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(($input)=>{
      expect($input[0].files[0].name).to.equal('example.json')
    });
  })
 it('seleciona um arquivo simulando um drag-and-drop',()=>{
  cy.get('#file-upload').selectFile('./cypress/fixtures/example.json' , {action: 'drag-drop'}).should(($input)=>{
    expect($input[0].files[0].name).to.equal('example.json');
  })
 })
 it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
  cy.fixture('example.json').as('teste')
  cy.get('#file-upload').selectFile('@teste').should(($input)=>{
    expect($input[0].files[0].name).to.equal('example.json');
  })
 })
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
  cy.get('a').should('have.attr','target','_blank');
 })
 it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
  cy.get('#privacy a').invoke('removeAttr','target').click();
  cy.get('.privacy').should('be.visible');
  
 })
 
  })