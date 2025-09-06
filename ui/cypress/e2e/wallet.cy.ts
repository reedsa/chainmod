describe("dashboard", () => {
  it("renders the dashboard with all components", () => {
    cy.visit("/wallet");

    cy.contains("Please connect a wallet to continue.");
  });
});
