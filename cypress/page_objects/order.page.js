class orderPage {
    element = {
        attachInvoiceBtn: () => cy.get('.mb10 > .btn-group > button[ng-model="dropOrders"]'),
        uploadInv: () => cy.get(`input[type="file"]`),
        clickOKBtn: () => cy.get(`button[ng-click="photoDirectiveOkCallback()"]`),
        clickItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
        endPreProcessingBTN: () => cy.get(`[ng-click="endPreprocessing()"]`),
        okBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
        clickVendor: () => cy.get(`span[aria-label="Select a vendor activate"]`),
        addVendor: () => cy.get(`input[placeholder="Select a vendor..."]`),
        selectDDItem: () => cy.get(`.ui-select-choices-row.active`),
        addExistingLineItem: () => cy.get(`div[ng-change="searchedItemSelected()"]`),
        selectCAN: () => cy.xpath(`(//*[@ng-click="setNewItemPackaging(pack)"])[2]`),
        selectRadio: () => cy.xpath(`(//*[@ng-click="setNewItemPackaging(pack)"])[1]`),
        FRCheckBox: () => cy.get(`span[translate="inviosoApp.order.finalReview.amReviewLabel"]`),
        saveExistingLineItem: () => cy.xpath(`(//*[@ng-click="addNewItem($event)"])[1]`),
        input: () => cy.get(`input[name="quantity"]`),
        unitPrice: () => cy.get(`input[name="unitPrice"]`),
        okBtnLI: () => cy.get(`button[ng-click="unitQuantityChanged()"]`),
        invoiceNumber: () => cy.get(`[ng-model="order.initialReviewInvoiceNum"]`),
        invoiceDate: () => cy.get(`[ng-model="order.initialReviewInvoiceDate"]`),
        todayDate: () => cy.get(`[ng-click="select('today', $event)"]`),
        verifiedTotal: () => cy.get(`[ng-model="order.initialReviewTotal"]`),
        openDD: () => cy.get(`[ng-change="irHandwrittenMarkupChanged()"]`).select('No'),
        initialReviewCompleteCheck: () => cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[1]`),
        IRSaveBtn: () => cy.get(`[ng-click="save($event)"]`),
        invoiceNumberRecon: () => cy.get(`[ng-model="order.invoiceNum"]`),
        invoiceDateRecon: () => cy.xpath(`(//*[@name="invoiceDate"])[2]`),
        openDDRecon: () => cy.get(`[ng-change="handwrittenMarkupChanged()"]`).select('No'),
        saveBtnRecon: () => cy.get(`[ng-click="reconcile($event)"]`),
        verifyBtn: () => cy.get(`[ng-click="verifyOrderAndClose()"]`),
        filterOption: () => cy.get(`[ng-model="filterValue"]`),
        clickLineItemBtn: () => cy.get(`[ng-click="addRow()"]`),
        openDDForOrderStatus: () => cy.get(`#appendToEl`),
        orderPageBtnsHolder: () => cy.xpath(`//*[@class='well well-sm']`),
        addInvoiceDD: () => cy.xpath(`//*[@class='dropdown']//*[@class='btn btn-md btn-primary dropdown-toggle']`)
    };


    cancelPreProcessing() {
        cy.wait(2000);
        this.element.endPreProcessingBTN().click();
        this.element.okBtn().click();
    }

    attachInvoice() {
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
        this.element.orderPageBtnsHolder().should('be.visible').then($el => {
            console.log($el.text());
            if ($el.text().includes("Add Invoice")) {
                this.element.addInvoiceDD().should('be.visible').click();
            }
        });
        const fileName = "image.jpg";
        this.element.uploadInv().attachFile(fileName);
        cy.wait(10000);
        this.element.clickOKBtn().should('not.be.disabled').click();
        cy.wait(2000);
    }

    searchOrder(orderName) {
        this.element.filterOption().clear();
        this.element.filterOption().type(orderName);
        cy.wait(2000);
        this.element.clickItem().click();
    }

    searchOrderFR() {
        cy.wait(5000);
        this.element.clickItem().click();
    }

    irProcessWithTenantCheck(vendorName, invoiceNumberStr) {
        this.element.clickVendor().click();
        this.element.addVendor().type(vendorName)
        this.element.selectDDItem().should('be.visible').click({
            multiple: true
        });
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().click();
        this.element.todayDate().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.verifiedTotal().type("20");
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    reconcialltionAndAddingLineItem(vendorName,invoiceNumberStr, lineItem) {
        this.element.clickVendor().click();
        this.element.addVendor().type(vendorName)
        this.element.selectDDItem().should('be.visible').click({
            multiple: true
        });
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        // add existing line item
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.addExistingLineItem().click();
        this.element.addExistingLineItem().type(lineItem);
        this.element.selectDDItem().click({multiple: true}, {force: true});
        cy.wait(1000);
        this.element.input().type("1");
        this.element.unitPrice().type("15");
        this.element.okBtnLI().click();
        cy.wait(3000);
        this.element.selectCAN().click();
        this.element.saveExistingLineItem().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        cy.wait(3000);
        this.element.verifyBtn().click();
    }

    reconcialltionAndAddingMultipleLineItem(vendorName,invoiceNumberStr, lineItem1, lineItem2) {
        this.element.clickVendor().click();
        this.element.addVendor().type(vendorName)
        this.element.selectDDItem().should('be.visible').click({
            multiple: true
        });
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        // add existing line item 1
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.addExistingLineItem().click();
        this.element.addExistingLineItem().type(lineItem1);
        this.element.selectDDItem().click({multiple: true}, {force: true});
        cy.wait(1000);
        this.element.input().type("1");
        this.element.unitPrice().type("15");
        this.element.okBtnLI().click();
        cy.wait(3000);
        this.element.selectCAN().click();
        cy.wait(3000);
        this.element.saveExistingLineItem().click();
        cy.wait(1000);
        // add existing line item 2
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.addExistingLineItem().click();
        this.element.addExistingLineItem().type(lineItem2);
        this.element.selectDDItem().click({multiple: true}, {force: true});
        cy.wait(1000);
        this.element.input().type("1");
        this.element.unitPrice().type("15");
        this.element.okBtnLI().click();
        cy.wait(3000);
        this.element.selectRadio().click();
        cy.wait(3000);
        this.element.saveExistingLineItem().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        cy.wait(3000);
        this.element.verifyBtn().click();
    }

    closeOrderFromFR() {
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
        cy.wait(3000);
    }

    SendOrderToAMReview() {
        this.element.FRCheckBox().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
        cy.wait(3000);
    }
}
module.exports = new orderPage();