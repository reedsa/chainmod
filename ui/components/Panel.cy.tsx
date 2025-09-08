import React from "react";
import Panel from "./Panel";

describe("<Panel />", () => {
  it("renders", () => {
    cy.mount(<Panel>Content</Panel>);
    cy.get("[data-cy='panel']").should("be.visible");
  });

  it("renders the title and children", () => {
    cy.mount(<Panel title="Title">Content</Panel>);
    cy.get("[data-cy='panel']").contains("Title");
    cy.get("[data-cy='panel']").contains("Content");
  });

  it("renders a large colspan", () => {
    cy.mount(<Panel gridCols={4}>Content</Panel>);
    cy.get("[data-cy='panel']").should("have.class", "md:col-span-2");
    cy.get("[data-cy='panel']").should("have.class", "lg:col-span-4");
  });

  it("renders a the specified colspan", () => {
    cy.mount(<Panel gridCols={2}>Content</Panel>);
    cy.get("[data-cy='panel']").should("have.class", "md:col-span-2");
    cy.get("[data-cy='panel']").should("have.class", "lg:col-span-2");
  });
});
