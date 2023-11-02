const jsonData = require('../fixtures/example.json')
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
    cy.get('summary').click();
    cy.get('#jsondata').clear().type(JSON.stringify(jsonData), { parseSpecialCharSequences: false });
    cy.get('#refreshtable').click({force:true});
    cy.get('#dynamictable > tr > td:nth-child(1)').each((el, index) => {
      expect(el.text()).to.contain(jsonData[index].name);
      cy.wrap(el).next().each((el)=>{
        expect(el.text()).to.contain(jsonData[index].age);
      })
      cy.wrap(el).next().next().each((el)=>{
        expect(el.text()).to.contain(jsonData[index].gender);
      })
    })
  })
})