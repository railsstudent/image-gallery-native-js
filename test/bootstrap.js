'use strict';

const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const globalVariables = { 
    browser: global.browser,
    expect: global.expect,
    assert: global.assert
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
    global.assert = assert;
    global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after (function () {
  global.browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
  global.assert = globalVariables.assert;
});