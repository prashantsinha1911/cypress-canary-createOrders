class hamburgerMenuPage {
    element = {
        OrdersParent: () => cy.get(`#navbar_order`),
        orderChild: () => cy.xpath(`//*[@href="#/order"]//*[@role='button']`),
    };


    goToOrders() {
        this.element.orderChild().click({
            force: true
        });
    }
}
module.exports = new hamburgerMenuPage();