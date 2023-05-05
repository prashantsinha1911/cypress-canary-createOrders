class loginPage {
    element = {
        userNameInput: () => cy.get("#username"),
        passwordInput: () => cy.get("#password"),
        loginText: () => cy.xpath(`//label[text()='Login']`),
        forgetPasswordLink: () => cy.xpath(`//*[@href="#/forgot"]`),
        signInBtn: () => cy.get("#signInBtn"),
        logoutDD: () => cy.get(`#userNameDropdown`),
        clickLogout: () => cy.get(`#logoutBtn`),
    };

    
    verifyLoginPageElement() {
        this.element.userNameInput().should("be.visible");
        this.element.passwordInput().should("be.visible");
        this.element.loginText().should("be.visible");
        this.element.forgetPasswordLink().should("be.visible");
    }

    loginAs(username, password) {
        this.element.userNameInput().type(username);
        this.element.passwordInput().type(password);
        this.element.signInBtn().click();
    }

    logout() {
        cy.wait(1000);
        this.element.logoutDD().should('be.visible').click({ force: true });
        this.element.clickLogout().should('be.visible').click({ force: true });
        this.element.userNameInput().should('be.visible');
    }
}
module.exports = new loginPage();