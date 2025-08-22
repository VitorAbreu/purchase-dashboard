// cypress/e2e/tasks.spec.ts

describe('Tasks E2E', () => {
  it('should filter tasks, open a detail, edit, and save', () => {
    // Step 1: Filter the list
    cy.visit('http://localhost:4200/');
    cy.get('[data-cy=text-search]').type('Task #1: Design login'); // input for text filter
    cy.wait(500);

    // Verify filtered list
    cy.get('[data-cy=task-view]').click();
    cy.wait(1000); // wait for filtering (adjust if needed)

    // Step 2: Open task details
    cy.contains('Edit Request T-1001');
    cy.url().should('include', '/form/T-1001');

    // Step 3: Edit fields
    cy.get('[data-cy=task-form-title]').clear().type('Updated Task #1');

    // Step 4: Save
    cy.get('[data-cy=save-btn]').click();
    cy.wait(1000);

    // Step 5: Verify changes in list
    cy.url().should('include', '/'); // back to list
    cy.get('[data-cy=text-search]').type('Updated Task #1');
    cy.get('[data-cy=task-title]').first().contains('Updated Task #1');
  });
});
