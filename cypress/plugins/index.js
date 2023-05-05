/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const path = require("path");
const gmail_tester = require("../../node_modules/gmail-tester/gmail-tester");

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    on("task", {
        "gmail:get-messages": async args => {
            const messages = await gmail_tester.get_messages(
                path.resolve(__dirname, "credentials.json"),
                path.resolve(__dirname, "gmail_token.json"),
                args.options
            );
            return messages;
        },
        "gmail:check-inbox": async args => {
            const messages = await gmail_tester.check_inbox(
                path.resolve(__dirname, "credentials.json"),
                path.resolve(__dirname, "gmail_token.json"),
                args.options
            );
            return messages;
        }
    });
};