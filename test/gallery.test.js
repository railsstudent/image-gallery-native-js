/*eslint no-undef: "off"*/

'use strict';

// const Gallery = require('../src/js/gallery.js');
const NUM_IMAGES = 15;
const TIMEOUT = 0;

describe('gallery test', function() {
  let page;

  before(async () => {
    this.timeout(TIMEOUT);
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  after(async () => {
    await page.close();
  });

  it('Should have correct page heading', async () => {
    try {
      const title = await page.evaluate(() => {
        return document.querySelector('div.title > p').innerText;
      });
      expect(title).to.equal('Swan Song');
    } catch (e) {
      console.error(e);
    }
  });

  it('Should have image class', async () => {
    try {
      await page.waitForSelector('.image', { visible: true, timeout: 0 });
      const numImages = await page.evaluate(() => document.querySelectorAll('.image').length);
      expect(numImages).to.equal(NUM_IMAGES);
    } catch (e) {
      console.error(e);
    }
  });

  it('Shows that image modal is not visible', async () => {
    try {
      await page.waitForSelector('.image', { visible: true, timeout: 0 });
      const modalHandle = await page.$('.modal');
      const displayValue = await page.evaluate((modal) => { 
        const style = window.getComputedStyle(modal);
        return style.display;
      }, modalHandle);
      expect(displayValue).to.equal('none');
      modalHandle.dispose();
    } catch (e) {
      console.error(e);
    }

  });

  it('Shows modal is visible when an image is clicked', async () => {
    try {
      await page.waitForSelector('.image', { visible: true, timeout: 0 });
      const imageElements = await page.$$('.image');
      console.log(imageElements.length);

      await imageElements[0].click();
      await page.screenshot( { 
        path: './test6.png'
      });
      // await page.waitForSelector('.modal', { visible: true, timeout: 0 });
      // const modalHandle = await page.$('.modal');
      const displayValue = await page.evaluate(() => { 
        const style = window.getComputedStyle(document.querySelector('.modal'));
        return style.display;
      });
      expect(displayValue).to.equal('block');
      // modalHandle.dispose();
    } catch (e) {
      console.error(e);
    }
  });
});


