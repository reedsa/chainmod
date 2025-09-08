import React from "react";
import Balance from "./Balance";

describe("<Balance />", () => {
  it("renders", () => {
    cy.mount(<Balance balanceEther="100" />);
    cy.get("[data-cy='balance']").should("be.visible");
    cy.get("[data-cy='balance-ether']").contains("100 ETH");
  });
});
