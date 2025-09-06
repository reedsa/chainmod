import React from "react";
import Loading from "./Loading";

describe("<Loading />", () => {
  it("renders", () => {
    cy.mount(<Loading>Loading...</Loading>);
    cy.get("[data-cy='loading']").should("be.visible");
  });

  it("renders at a certain width and height", () => {
    cy.mount(
      <Loading width="100px" height="100px">
        Loading...
      </Loading>
    );
    cy.get("[data-cy='loading']").should("have.css", "width", "100px");
    cy.get("[data-cy='loading']").should("have.css", "height", "100px");
  });
});
