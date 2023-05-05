const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://stagerc.marginedge.com/",
        supportFile: 'cypress/support/index.js',
        specPattern: 'cypress/integration/**/*.js',
    },
    "numTestsKeptInMemory": 1,
    "viewportWidth": 1920,
    "viewportHeight": 1080,
    "reporter": "junit",
    "videoRecording": true,
    "video": true,
    "videoUploadOnPasses": false,
    "redirectionLimit": 80,
    "defaultCommandTimeout": 50000,
    "pageLoadTimeout": 90000,
    "requestTimeout": 10000,
    "reporterOptions": {
        "mochaFile": "reports/cypress-output.xml",
        "toConsole": true
    }
});