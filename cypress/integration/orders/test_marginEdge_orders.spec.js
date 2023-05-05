const loginPageObjs = require("../../page_objects/login.pageObjects");
const creds = require("../../fixtures/credentials.json");
const sanityTestData = require("../../fixtures/testData_Sanity.json")
const utilObj = require("../../utils/util");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPageObj = require("../../page_objects/order.page");

let timeStamp = new Date().toISOString();
// creating global variable for test
export const tenant = sanityTestData.tenantName;
let VendorName ="JFC";
let invoiceNumberStr = "Inv001"+timeStamp;
let invoiceNumberStr2 = "Inv002"+timeStamp;
let lineItem = "Sesame Oil - 04737";
let lineItemWOProduct = "Fresh Chili Garlic - 26245"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements
    cy.visit(Cypress.env('host'));
    loginPageObjs.verifyLoginPageElement();
});

afterEach(() => {
    // logout from app
    loginPageObjs.logout();
});

describe("Orders Scenarios - Test 1 (Closed Order)", () => {
    it("Login as Test User, Upload Invoice and Cancel Preprocessing", () => {
        loginPageObjs.loginAs(creds.testUser, creds.password);
        utilObj.checkRestUnit(tenant,tenant);
        // go to order and uplaod the invoice and cancel the preprocessing
        hamburgerMenuPageObj.goToOrders();
        orderPageObj.attachInvoice();
        orderPageObj.cancelPreProcessing();
        orderPageObj.searchOrderFR();
    });

    it(" Login as Test User, Complete IR, Recon and Close the Order from FR State", () => {
        loginPageObjs.loginAs(creds.testUser, creds.password);
        utilObj.checkRestUnit(tenant,tenant);
        // go to orders
        hamburgerMenuPageObj.goToOrders();
        cy.wait(7000);
        orderPageObj.searchOrderFR();
        // complete IR
        orderPageObj.irProcessWithTenantCheck(VendorName,invoiceNumberStr);
        orderPageObj.searchOrder(invoiceNumberStr);
        // complete Recon
        orderPageObj.reconcialltionAndAddingLineItem(VendorName,invoiceNumberStr,lineItem);
        // close order
        cy.wait(5000);
        orderPageObj.searchOrder(invoiceNumberStr);
        orderPageObj.closeOrderFromFR();
    }) 
});

describe("Orders Scenarios - Test 2 (AM Review Order)", () => {
    it("Login as Test User, Upload Invoice and Cancel Preprocessing", () => {
        loginPageObjs.loginAs(creds.testUser, creds.password);
        utilObj.checkRestUnit(tenant,tenant);
        // go to order and uplaod the invoice and cancel the preprocessing
        hamburgerMenuPageObj.goToOrders();
        orderPageObj.attachInvoice();
        orderPageObj.cancelPreProcessing();
        orderPageObj.searchOrderFR();
    });

    it(" Login as Test User, Complete IR, Recon and Close the Order from FR State", () => {
        loginPageObjs.loginAs(creds.testUser, creds.password);
        utilObj.checkRestUnit(tenant,tenant);
        // go to orders
        hamburgerMenuPageObj.goToOrders();
        cy.wait(7000);
        orderPageObj.searchOrderFR();
        // complete IR
        orderPageObj.irProcessWithTenantCheck(VendorName,invoiceNumberStr2);
        orderPageObj.searchOrder(invoiceNumberStr2);
        // complete Recon
        orderPageObj.reconcialltionAndAddingMultipleLineItem(VendorName,invoiceNumberStr2,lineItem,lineItemWOProduct);
        // compete Final Review and send the order to AM Review
        cy.wait(5000);
        orderPageObj.searchOrder(invoiceNumberStr2);
        orderPageObj.SendOrderToAMReview();
    }) 
}) 