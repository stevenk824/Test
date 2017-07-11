var utils = require('./utilities');
var selectors = browser.params;

describe("Functionality Tests", function () {
    this.timeout(35000);

    before(function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
    });

    it(": Open site url", function () {
        utils.openUrl(selectors.specs.siteUrl);
    });

    it(": Add drill to cart and verify contents", function () {
        utils.clickDisplayedElement(selectors.siteSelectors.drillAddToCart);
        utils.compareTexts(selectors.textOptions.drillCartContents);
        utils.insertTextWithTextInField(selectors.siteSelectors.firstItemAddedQuantity, '2');
        utils.compareTexts([{
            selector: '#shopping-cart [data-uid="75"] .nx-fieldtext',
            textToCompare: '$200.00',
            logName: 'Increased quantity price with 2 drills'
        }]);
        utils.compareTexts([{
            selector: '#shopping-cart .nx-summary .nx-fieldtext',
            textToCompare: '$200.00 (SUM)',
            logName: 'Sum after 2 drills added to cart'
        }]);
    });

    it(": Add wrench to cart and verify contents", function () {
        utils.clickDisplayedElement(selectors.siteSelectors.wrenchAddToCart);
        utils.compareTexts(selectors.textOptions.wrenchCartContents);
        utils.insertTextWithTextInField(selectors.siteSelectors.secondItemAddedQuantity, '3');
        utils.compareTexts([{
            selector : '#shopping-cart [data-uid="94"] .nx-fieldtext',
            textToCompare : '$45.00',
            logName : 'Increased quantity price with 3 wrenches'
        }]);
        utils.compareTexts([{
            selector: '#shopping-cart .nx-summary .nx-fieldtext',
            textToCompare: '$245.00 (SUM)',
            logName: 'Sum after 3 wrenches added to cart'
        }]);
    });

    it(": Add hammer to cart and verify contents", function () {
        utils.clickDisplayedElement(selectors.siteSelectors.hammerAddToCart);
        utils.compareTexts(selectors.textOptions.hammerCartContents);
        utils.insertTextWithTextInField(selectors.siteSelectors.thirdItemAddedQuantity, '10');
        utils.compareTexts([{
            selector : '#shopping-cart [data-uid="113"] .nx-fieldtext',
            textToCompare : '$100.00',
            logName : 'Increased quantity price with 10 hammers'
        }]);
        utils.compareTexts([{
            selector: '#shopping-cart .nx-summary .nx-fieldtext',
            textToCompare: '$345.00 (SUM)',
            logName: 'Sum after 10 wrenches added to cart'
        }]);
    });

    it(": Click to  navigate payment information page ", function () {
        utils.clickDisplayedElement(selectors.siteSelectors.paymentInformation);
    });

    it(": Verify contents of preview order grid", function () {
        utils.compareTexts(selectors.textOptions.reviewOrderCartContents);
    });

    it(": Submit payment", function () {
        utils.insertText(selectors.siteSelectors.CCInput, '4111111111111111');
        utils.insertText(selectors.siteSelectors.expirationDate, '0118');
        utils.insertText(selectors.siteSelectors.cvv, '123');
        utils.clickDisplayedElement(selectors.siteSelectors.processPayment);
    });

    it(": Verify contents of order summary page", function () {
        utils.compareTexts(selectors.textOptions.orderSummaryConfirmation);
        utils.clickDisplayedElement(selectors.siteSelectors.newOrder);
        utils.waitForIsDisplayed($(selectors.siteSelectors.paymentInformation));
        console.log('Log - test finished');
    });
});
