import Orders from "../../src/modules/orders";

/* eslint-disable no-undef */
describe('Clicking on a "Add to order" button for a second product', () => {
  before(() => {
    cy.intercept("GET", "**/api/products", { fixture: "products.json" });
    cy.intercept("POST", "**/api/orders", {
      fixture: "orderCreateResponse.json",
    }).as("Orders.create");
    cy.intercept("PUT", "**/api/orders", {
      fixture: "orderUpdateResponse.json",
    }).as("Orders.update");
    cy.visit("/");
    cy.get("[data-cy=product-list]")
      .children()
      .first()
      .within(() => {
        cy.get("button").click();
      });

    cy.get("[data-cy=product-list]")
      .children()
      .last()
      .within(() => {
        cy.get("button").click();
      });
  });
  it("is expected to make a call to PUT request to the API", () => {
    cy.wait("@Orders.update").its("request.method").should("eq", "PUT");
  });

  //   it("is expected to include product_id and order_id in the request", () => {
  //     cy.wait("@Orders.update")
  //       .its("request.body")
  //       .should("have.property", "product_id");
  //   });

  it("is expected to render a message", () => {
    cy.get("[data-cy=message_box]").should(
      "contain",
      "Hamburger was added to your order!"
    );
  });
});
