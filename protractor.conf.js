const { SpecReporter } = require('jasmine-spec-reporter');
var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
var path = require('path');
exports.config = {
    allScriptsTimeout: 50000,// Time to wait for page to synchronize
    getPageTimeout: 20000,//Time to wait for the page to load
    specs: [
        './src/**/*app-home.spec.ts',        
    ],
    directConnect: true,// allows Protractor to connect to the browser drivers
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',
    params:
    {
        sessionTimeOut: 600000,//csop session timeout
        defaultTimeout: 300000,
        sleepPeriod: 1000,
        timeOut: 60000
    },
    baseUrl: 'https://chercher.tech/',
    jasmineNodeOpts: {
        showColors: true,
        showTiming: true,
        defaultTimeoutInterval: 600000 // Default time to wait in ms before a test fails.
    },
    onPrepare() {
        global.EC = protractor.ExpectedConditions;
        browser.driver.manage().window().maximize();
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: require('path').resolve(__dirname, './test_results/xml_results'),
            filePrefix: 'xmlresults'
        }));
    },
    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var HTMLReport = require('protractor-html-reporter-2');

            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: require('path').resolve(__dirname, './test_results/html_results'),
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from(require('path').resolve(__dirname, './test_results/xml_results/xmlresults.xml'), testConfig);
        });
    }
};