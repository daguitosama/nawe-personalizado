/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Service Page", () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.on("uncaught:exception", (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false;
        });
        cy.viewport("iphone-xr", "portrait");
        cy.visit("http://localhost:3000/servicios/serigrafia");
    });

    it("Has a valid title", () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get("h1").should("exist").should("have.text", "Servicio de Impresión Serigráfica");
    });

    it("Is able to make order", () => {
        // data-test-id="whatsapp_phone"
        cy.get('[data-test-id="order-link"]').should("exist");
    });
});
