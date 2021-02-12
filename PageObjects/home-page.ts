import { by, element } from "protractor";

export class HomePage {
    public logo = element(by.id('logo'));
    public async logoDisplayed() {
        return this.logo.isDisplayed();
    }
}