exports.config = {
    seleniumAddress : 'http://localhost:4444/wd/hub',
    // mocha ops bail fast fails the after any initial assertion error or expect failure.
    // I have it set to false because it is a functionality test first and foremost and we don't want to have to continue to rerun it.
    // If set to true will fail on first error.
    // Reporter prints results to xml file to be interpreted by CI's.
    mochaOpts: {
        bail: false,
        reporter: 'mocha-junit-reporter',
        reporterOptions : {
            mochaFile: 'test-reports/functionalTest.xml',
            reportDir: 'test-reports/xml',
            reportFilename: 'funtionalTest'
        }
    },
    // Describes which browser combination to run on locally as well as Browserstack.
    capabilities : {
        'browserName' : 'chrome',
        'platform' : 'MAC',
        'maxInstances' : 1
    },
    suites : {
        functionalityTest : 'functionalTest.js'
    },

    // List of params to be passed to the test
    // The textOptions are configurable to run any set of text comparisons to be done in the flow.
    // Doing this as an array minimizes the amount of code that has to be written on the test level and simplifies
    // the process to add or extract data from a test.
    params : {
        specs: {
            // IMPORTANT: removed url on purpose
            siteUrl : ''
        },
        siteSelectors : {
            drillAddToCart : '#item-list tr:nth-child(1) .sk-action-field',
            firstItemAddedQuantity : '#shopping-cart [data-uid="74"] [inputmode="numeric"]',
            wrenchAddToCart : '#item-list tr:nth-child(2) .sk-action-field',
            secondItemAddedQuantity : '#shopping-cart [data-uid="93"] [inputmode="numeric"]',
            hammerAddToCart : '#item-list tr:nth-child(3) .sk-action-field',
            thirdItemAddedQuantity : '#shopping-cart [data-uid="112"] [inputmode="numeric"]',
            paymentInformation : '#nav-payment-info',
            CCInput: '#payment-information [data-uid="55"] input',
            expirationDate: '#payment-information [data-uid="56"] input',
            cvv : '#payment-information [data-uid="57"] input',
            processPayment: '#nav-process-payment',
            newOrder: '#nav-start-over'
        },
        textOptions : {
            // Each of these refers to a segment in the cart when the specific item is added to it.
            drillCartContents : [
                {selector : '#shopping-cart [data-uid="71"] .nx-fieldtext', textToCompare : 'Drill', logName : 'Wrench'},
                {selector : '#shopping-cart [data-uid="73"] .nx-fieldtext', textToCompare : '$100.00', logName : 'Drill price'}
            ],
            wrenchCartContents : [
                {selector : '#shopping-cart [data-uid="90"] .nx-fieldtext', textToCompare : 'Wrench', logName : 'Wrench'},
                {selector : '#shopping-cart [data-uid="92"] .nx-fieldtext', textToCompare : '$15.00', logName : 'Wrench price'}
            ],
            hammerCartContents : [
                {selector : '#shopping-cart [data-uid="109"] .nx-fieldtext', textToCompare : 'Hammer', logName : 'Hammer'},
                {selector : '#shopping-cart [data-uid="111"] .nx-fieldtext', textToCompare : '$10.00', logName : 'Hammer price'}
            ],
            // The selectors and text to compare with the review order cart.
            reviewOrderCartContents : [
                {selector : '#order-summary [data-uid="115"] .nx-fieldtext', textToCompare : 'Hammer', logName : 'Hammer'},
                {selector : '#order-summary [data-uid="117"] .nx-fieldtext', textToCompare : '$10.00', logName : 'Hammer price'},
                {selector : '#order-summary [data-uid="118"] .nx-fieldtext', textToCompare : '10', logName : 'Hammer quantity'},
                {selector : '#order-summary [data-uid="119"] .nx-fieldtext', textToCompare : '$100.00', logName : 'Hammer(s) price'},
                {selector : '#order-summary [data-uid="96"] .nx-fieldtext', textToCompare : 'Wrench', logName : 'Wrench'},
                {selector : '#order-summary [data-uid="98"] .nx-fieldtext', textToCompare : '$15.00', logName : 'Wrench price'},
                {selector : '#order-summary [data-uid="99"] .nx-fieldtext', textToCompare : '3', logName : 'Wrench quantity'},
                {selector : '#order-summary [data-uid="100"] .nx-fieldtext', textToCompare : '$45.00', logName : 'Wrenches price'},
                {selector : '#order-summary [data-uid="77"] .nx-fieldtext', textToCompare : 'Drill', logName : 'Drill'},
                {selector : '#order-summary [data-uid="79"] .nx-fieldtext', textToCompare : '$100.00', logName : 'Hammer price'},
                {selector : '#order-summary [data-uid="80"] .nx-fieldtext', textToCompare : '2', logName : 'Drill quantity'},
                {selector : '#order-summary [data-uid="81"] .nx-fieldtext', textToCompare : '$200.00', logName : 'Drill(s) price'},
                {selector : '#order-summary .nx-summary', textToCompare : '$345.00 (SUM)', logName : 'Order summary total price'}
            ],
            orderSummaryConfirmation : [
                // IMPORTANT: bug on given test url where total is always 1 dollar more than actual.
                {selector : '#sk-PMW9H-549 .nx-fieldtext', textToCompare : '$345.00', logName : 'Order summary total price'}
            ]
        }


    },
    framework : 'mocha',
    windowHandler : {
        winHandlerName : null
    }
};
