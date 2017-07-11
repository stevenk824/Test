var expect = require('chai').expect;
var EC = protractor.ExpectedConditions;

module.exports = {
    /**
     * @param url to open
     */
    openUrl: function (url) {
        return browser.get(url, 30000).then(function () {
            return console.log("Log - Opened Url: " + url);
        })
    },

    /**
     * @param element to wait for
     * @description some elements do not need to be displayed and or text is nested inside of non-displayed elements
     * this waits for an element to load on the DOM, but does not measure it's styling
     */
    waitForElement: function (element) {
        return browser.wait(function () {
            return browser.isElementPresent(element);
        }, 10000, 'Could not find element on DOM').then(function (elmIsPresent) {
           return elmIsPresent
        });
    },

    /**
     * @param element to check display
     * @description locates an element and sets the condition to expect to be visiblity of.
     * see http://www.protractortest.org/#/api?view=ProtractorExpectedConditions.prototype.visibilityOf
     */
    waitForIsDisplayed: function (element) {
        return browser.wait(EC.visibilityOf(element), 10000, 'Element is not displayed').then(function (isDisplayed) {
           return isDisplayed;
        });
    },

    /**
     * @param element to find text
     * @param textToCompare to compare to text in param element
     * @param logName to simplify log
     * @description see waitForElementText description.  Waits for promise of text being present, extracts text from page,
     * runs comparison of actual text vs what we expect from the test data.  Fails on expect.
     */
    expectedTexts: function (element, textToCompare, logName) {
        var newElm = $(element);
        var text;
        return this.waitForElementText(newElm, textToCompare).then(function () {
            return newElm.getText();
        }.bind(this)).then(function (value) {
            text = value;
            return expect(text).to.equal(textToCompare);
        }).then(function () {
            console.log("Log - expected text \"" + text + "\"  matches actual for " + logName);
        });
    },

    /**
     * @param elmAndText array object with selector, text to compare, and log name to be passed to expectedTexts
     * @description iterates through the object array provided from the test.  If you want to run a single set of strings,
     * use expectedTexts on the test level.
     */
    compareTexts: function (elmAndText) {
        var that = this;

        return elmAndText.forEach(function (obj) {
            return that.expectedTexts(obj.selector, obj.textToCompare, obj.logName);
        });

    },

    // wait for element to be displayed before clicking
    /**
     * @param element to click
     * @description waits on element readiness for click
     * (http://www.protractortest.org/#/api?view=ProtractorExpectedConditions.prototype.elementToBeClickable)
     * Fails on browser wait if conditions were not met.
     */
    clickDisplayedElement: function (element) {
        var newElm = $(element);

        browser.wait(EC.elementToBeClickable(newElm), 10000, 'Element was not clickable');
        return newElm.click().then(function () {
            console.log('Log - Clicked on ' + element);
        })
    },

    /**
     * @param element element to find text
     * @param text to check in element
     * @description waits for text to be present in element (cannot be used for <button>).
     * Fails if text could not be found.
     * See: http://www.protractortest.org/#/api?view=ProtractorExpectedConditions.prototype.textToBePresentInElement
     */
    waitForElementText: function (element, text) {
        return browser.wait(EC.textToBePresentInElement(element, text), 5000, 'Could not find text: ' + text).then(function (textIsThere) {
            return textIsThere;
        });
    },

    /**
     * @param element to insert text into
     * @param text to insert
     * @description wait for element to be displayed.  Clears text field and inserts new text.
     */
    insertTextWithTextInField: function (element, text) {
        var newElm = $(element);
        return browser.wait(this.waitForIsDisplayed(newElm), 5000).then(function () {
            newElm.clear();
            newElm.sendKeys(text);
            console.log('Log - Inserted text: ' + text)
        });
    },

    /**
     * @param element to insertText
     * @param text to insert
     * @description waits for element to be displayed.  Inserts text into empty field.
     */
    insertText: function (element, text) {
        var newElm = $(element);
        return browser.wait(this.waitForIsDisplayed(newElm), 5000).then(function () {
            newElm.sendKeys(text);
            console.log('Log -Inserted text: ' + text)
        });
    }
};

