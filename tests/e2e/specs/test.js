// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  beforeEach(() => {
    cy.reload();
  });

  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h2", "かんばんボード");
    cy.get(".kanban");
  });

  it("addModal successfully loads and closes", () => {
    cy.get(".story tr")
      .its("length")
      .should("equal", 12);

    cy.get("button")
      .eq(0)
      .click();
    cy.get("input")
      .eq(0)
      .clear()
      .type("eating");
    cy.get("button")
      .eq(1)
      .click();

    cy.get(".story tr")
      .its("length")
      .should("equal", 12);
  });

  it("addModal successfully saves", () => {
    cy.get(".story tr")
      .its("length")
      .should("equal", 12);

    cy.get("button")
      .eq(0)
      .click();
    cy.get("input")
      .eq(0)
      .clear()
      .type("eating");
    cy.get("button")
      .eq(2)
      .click();

    cy.get(".story tr")
      .its("length")
      .should("equal", 13);
  });

  it("detailModal successfully deletes", () => {
    cy.get(".story tr")
      .its("length")
      .should("equal", 12);

    cy.get(".story tr")
      .eq(0)
      .should("contain", "画期的なデザインに変更");

    cy.get(".story tr td")
      .eq(0)
      .click();
    cy.get("button")
      .eq(5)
      .click();

    cy.get(".story tr")
      .its("length")
      .should("equal", 11);

    cy.get(".story tr")
      .eq(0)
      .should("not.contain", "画期的なデザインに変更");

    //cy.not.contains(".story tr", "");
  });

  it("detailModal successfully saves", () => {
    cy.get(".story tr").should("contain", "画期的なデザインに変更");

    cy.get(".story tr td")
      .eq(0)
      .click();
    cy.get("input")
      .eq(1)
      .clear()
      .type("ストーリー100");
    cy.get("select").select("Review");
    cy.get("textarea")
      .eq(1)
      .clear()
      .type("内容100");
    cy.get("button")
      .eq(4)
      .click();

    cy.get(".story tr").should("not.contain", "画期的なデザインに変更");
    cy.get(".story tr").should("contain", "ストーリー100");
  });

  it("detailModal successfully loads and closes", () => {
    cy.get(".story tr").should("contain", "画期的なデザインに変更");

    cy.get(".story tr td")
      .eq(0)
      .click();
    cy.get("input")
      .eq(1)
      .clear()
      .type("ストーリー100");
    cy.get("select").select("Review");
    cy.get("textarea")
      .eq(1)
      .clear()
      .type("内容100");
    cy.get("button")
      .eq(3)
      .click();

    cy.get(".story tr").should("contain", "画期的なデザインに変更");
    cy.get(".story tr").should("not.contain", "ストーリー100");
  });
});
