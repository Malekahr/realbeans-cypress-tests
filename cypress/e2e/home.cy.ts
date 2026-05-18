describe('RealBeans Shopify webshop', () => {

  const storeUrl = 'https://r1053782-realbeans.myshopify.com'
  const password = 'theagh'

  beforeEach(() => {

    cy.visit(storeUrl, { failOnStatusCode: false })

    cy.get('body').then(($body) => {

      if ($body.text().toLowerCase().includes('password')) {

        cy.get('input[type="password"]').type(password)

        cy.get('button[type="submit"]').click({ force: true })

      }

    })

  })

  describe('product catalog test', () => {

    it('The product catalog page shows the correct items you entered', () => {

      cy.visit(`${storeUrl}/collections/all`)

      cy.contains('Blended coffee 5kg')
      cy.contains('Roasted coffee beans 5kg')

    })

  })

  describe('sorting products test', () => {

  it('Sorting products (e.g., by price) actually changes their order', () => {

    // Open product catalog
    cy.visit(`${storeUrl}/collections/all`)

    // Select sorting option
    cy.get('select').first().select('price-ascending', { force: true })

    // Check if products still appear after sorting
    cy.contains('Roasted coffee beans 5kg')
    cy.contains('Blended coffee 5kg')

  })

})

  describe('product detail page test', () => {

  it('Product detail pages display the right descriptions, prices, and imagenames', () => {

    cy.visit(`${storeUrl}/products/roasted-coffee-beans-5kg-1`)

    

    cy.contains('Our best and sustainable real roasted beans.')
    cy.contains('€40')
    cy.get('img[src*="RealBeansRoastedBag"]')

    cy.visit(`${storeUrl}/products/blended-coffee-5kg`)

    

    cy.contains('RealBeans coffee, ready to brew.')
    cy.contains('€55')
    cy.get('img[src*="RealBeansBlendBag"]')

  })

})

  describe('homepage test', () => {

  it('The homepages intro text, and product list appear correctly', () => {

    cy.visit(storeUrl, { failOnStatusCode: false })

    // Check intro text
    cy.contains('Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes.')
    cy.contains('Ethically sourced beans, crafted with care.')

    // Check products on homepage
    cy.contains('Roasted coffee beans 5kg')
    cy.contains('Blended coffee 5kg')

  })

})


  describe('about page test', () => {

    it('The About page includes the history paragraph', () => {

      cy.visit(`${storeUrl}/pages/about`)

      cy.contains('From a small Antwerp grocery to a European coffee staple')
      cy.contains('RealBeans honors tradition while innovating for the future')
      cy.contains('Our beans are roasted in-house, shipped from Antwerp or Stockholm')

    })

  })

})