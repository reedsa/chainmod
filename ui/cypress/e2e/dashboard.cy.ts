describe("dashboard", () => {
  it("renders the dashboard with all components", () => {
    cy.visit("/");

    cy.get("[data-cy='navigation'").should("be.visible");

    cy.get("[data-cy='status']").should("be.visible");
    cy.get("[data-cy='status']").contains("Price");
    cy.get("[data-cy='transactions-count']").contains(
      "Transactions (Last 100 Blocks):"
    );

    cy.get("[data-cy='block']").should("be.visible");
    cy.get("[data-cy='block']").contains("Latest Block");
    cy.get("[data-cy='block']").contains("Time");
    cy.get("[data-cy='block']").contains("Transactions");

    cy.get("[data-cy='tokens']").should("be.visible");
    cy.get("[data-cy='tokens']").contains("Top Tokens");
    cy.get("[data-cy='tokens-list']").children().should("have.length", 10);
    cy.get("[data-cy='tokens-list']").first().contains("USD");
    cy.get("[data-cy='tokens-list']").first().contains("Trade Volume");
  });
});
