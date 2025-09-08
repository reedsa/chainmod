import React from "react";
import type { FormattedWalletToken } from "@/types/wallet";
import Tokens from "./Tokens";

describe("<Tokens />", () => {
  it("renders", () => {
    cy.mount(<Tokens address={"0x1234"} />);
    cy.contains("There was an error fetching tokens");
  });
});
