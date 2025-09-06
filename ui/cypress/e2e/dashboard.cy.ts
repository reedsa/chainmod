describe("dashboard", () => {
  it("renders the dashboard with all components", () => {
    cy.visit("/");

    cy.get("[data-cy='navigation'").should("be.visible");
  });
});
