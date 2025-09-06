import React from "react";
import Navigation from "./Navigation";

describe("<Navigation />", () => {
  it("renders", () => {
    cy.mount(<Navigation />);
    cy.get("[data-cy='navigation']").get("li").should("have.length", 2);
    cy.get("[data-cy='dashboard-link']").contains("Dashboard");
    cy.get("[data-cy='wallet-link']").contains("Wallet");
  });
});
