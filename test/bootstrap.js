'use strict';

const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const globalVariables = { 
    browser: global.browser,
    expect: global.expect
};

// puppeteer options
const opts = {
  headless: true,
  slowMo: 150,
  timeout: 50000
};

// expose variables
before (async function () {
    global.expect = expect;
    //mock localStorage
    // global.window = {
    //     localStorage: {
    //         getItem: function _getItem() {
    //             return null;
    //         }
    //     }
    // };
    global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after (function () {
  global.browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});