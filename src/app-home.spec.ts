import { browser, by, element, ExpectedConditions as EC } from 'protractor';
import { HomePage } from '../PageObjects/home-page';

describe('Test Suite..', async () => {
    let originalTimeout = 0;
    const homePage = new HomePage();
    beforeAll(async function () {
        console.log('BeforeAll Block: Test Suite');
    });
    beforeEach(async () => {
        browser.waitForAngularEnabled(false);
        browser.get('');
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = browser.params.defaultTimeout;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('Verify that Chercher Tech Logo is Displayed', async () => {
        await browser.driver.sleep(1000);
        await expect(browser.getTitle()).toEqual('CherCher Tech | Learning is fun');
        await expect(homePage.logoDisplayed()).toBe(true);
        await browser.driver.sleep(1000);
    });

    afterAll(async function () {
        console.log('AfterAll Block: Test Suite');
    });
});
