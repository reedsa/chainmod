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

  it("renders different widths", () => {
    cy.mount(<Panel className="md:col-span-2 lg:col-span-4">Content</Panel>);
    cy.get("[data-cy='panel']").should(
      "have.class",
      "md:col-span-2 lg:col-span-4"
    );

    cy.mount(<Panel className="md:col-span-2 lg:col-span-2">Content</Panel>);
    cy.get("[data-cy='panel']").should(
      "have.class",
      "md:col-span-2 lg:col-span-2"
    );
  });
});
