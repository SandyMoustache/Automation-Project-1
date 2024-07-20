beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        // Fill all mandatory fields
        cy.get('#username').type('johnDoe')
        cy.get('#email').type('john@example.com')
        cy.get('input[name="name"]').type('Nikita')
        cy.get('[data-testid="lastNameTestId"]').type('Novinkins')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    
        // Fill in different values in the password and confirmation password input fields
        cy.get('#password').type('Password123')
        cy.get('#confirm').type('DifferentPassword123')
    
        // Click somewhere to activate validation
        cy.get('h2').contains('Password section').click()
    
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
    
        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
    
        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
    
        // Change the password confirmation to match
        cy.get('#confirm').clear().type('Password123')
    
        // Click somewhere to activate validation again
        cy.get('h2').contains('Password section').click()
    
        // Scroll back to the submit button (if necessary)
        cy.get('.submit_button').scrollIntoView()
    
        // Assert that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')
    
        // Optionally, wait a short time before the final assertion
        cy.wait(500)
    
        // Assert that submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
    
        // Click the submit button
        cy.get('.submit_button').click()
    
        // Assert that success message is visible
        cy.get('#success_message')
          .should('be.visible')
          .should('contain', 'User successfully submitted registration')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })
    
    it('User can submit form with all fields added', () => {
        // Fill in all mandatory fields
        cy.get('#username').type('johnDoe')
        cy.get('#email').type('john@example.com')
        cy.get('input[name="name"]').type('Nikita')
        cy.get('[data-testid="lastNameTestId"]').type('Novinkins')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    
        // Fill in optional fields
        cy.get('#htmlFavLanguage').check()
        cy.get('#vehicle1').check()
        cy.get('#vehicle2').check()
        cy.get('#cars').select('Audi')
        cy.get('#animal').select('Dog')
    
        // Fill in passwords
        cy.get('#password').type('Password123')
        cy.get('#confirm').type('Password123')
    
        // Click somewhere to activate validation
        cy.get('h2').contains('Password section').click()
    
        // Scroll back to the submit button (if necessary)
        cy.get('.submit_button').scrollIntoView()
    
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
    
        // Click the submit button
        cy.get('.submit_button').click()
    
        // Assert that success message is visible
        cy.get('#success_message')
          .should('be.visible')
          .should('contain', 'User successfully submitted registration')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Function to fill in mandatory data
        const inputValidData = (username) => {
            cy.get('#username').type(username)
            cy.get('#email').type('john@example.com')
            cy.get('input[name="name"]').type('Nikita')
            cy.get('[data-testid="lastNameTestId"]').type('Novinkins')
            cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
            cy.get('#password').type('Password123')
            cy.get('#confirm').type('Password123')
        }
    
        // Call the function to fill in mandatory data
        inputValidData('johnDoe')
    
        // Click somewhere to activate validation
        cy.get('h2').contains('Password section').click()
    
        // Scroll back to the submit button (if necessary)
        cy.get('.submit_button').scrollIntoView()
    
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
    
        // Click the submit button
        cy.get('.submit_button').click()
    
        // Assert that success message is visible
        cy.get('#success_message')
          .should('be.visible')
          .should('contain', 'User successfully submitted registration')
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    // Add at least 1 test for checking some mandatory field's absence
    it('Submit button is not enabled when phone number mandatory field is not present', () => {
        // Fill in all mandatory fields except for the phone number
        cy.get('#username').type('johnDoe')
        cy.get('#email').type('john@example.com')
        cy.get('input[name="name"]').type('Nikita')
        cy.get('[data-testid="lastNameTestId"]').type('Novinkins')
        cy.get('#password').type('Password123')
        cy.get('#confirm').type('Password123')

        // Click somewhere to activate validation
        cy.get('h2').contains('Password section').click()

        // Scroll back to the submit button (if necessary)
        cy.get('.submit_button').scrollIntoView()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

    })
    
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').first().should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').first().invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that the second picture is correct and has correct size', () => {
        cy.log('Will check second picture source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 50)
    })

    it('Check the second link in the navigation bar', () => {
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        cy.url().should('contain', '/registration_form_3.html')
        
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that checkboxes are correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    })

    it('Check that animal dropdown is correct', () => {
        cy.get('#animal').find('option').should('have.length', 6)
        
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
    
    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}