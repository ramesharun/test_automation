import * as locators from './Homepage.json';
import * as pageObjectMethods from '../../lib/page_object_methods';
import { coin } from '../../lib/urls';

const commands = {

  locators: () => locators,

  navigationPath: () => {
    return [
      {
        page: 'Homepage',
        action: 'navigate'
      },
      {
        page: 'Homepage',
        action: 'waitForPageToLoad'
      }
    ];
  },

  getShiftFormDepositCoin: function(cb) {
    const self = this;
    if (!cb || typeof cb !== 'function') {
      self.api.assert.equal(true, false, '#getShiftFormDepositCoin called with no callback provided');
    }
    self.api.getText(locators.shiftFormInputCoin.locator, function(getTextResults) {
      self.api.assert.equal(getTextResults.status, 0, `Unable to get text from ${locators.shiftFormInputCoin.description} using locator ${locators.shiftFormInputCoin.locator}`);
      cb(getTextResults.value);
    });
    return self;
  },

  getShiftFormReceiveCoin: function(cb) {
    const self = this;
    if (!cb || typeof cb !== 'function') {
      self.api.assert.equal(true, false, '#getShiftFormReceiveCoin called with no callback provided');
    }
    self.api.getText(locators.shiftFormOutputCoin.locator, function(getTextResults) {
      self.api.assert.equal(getTextResults.status, 0, `Unable to get text from ${locators.shiftFormOutputCoin.description} using locator ${locators.shiftFormOutputCoin.locator}`);
      cb(getTextResults.value);
    });
    return self;
  },

  getShiftFormPairing: function(cb) {
    const self = this;
    self.getShiftFormDepositCoin(function(depositCoinResults) {
      self.getShiftFormReceiveCoin(function(receiveCoinResults) {
        cb({
          inCoin: depositCoinResults,
          outCoin: receiveCoinResults
        })
      });
    });
    return self;
  },

  clickContinueButton: function() {
    const self = this;
    self.api.useXpath();
    self.api.waitForElementVisible(locators.shiftFormContinueButton.locator, 15000);
    self.api.click(locators.shiftFormContinueButton.locator, function(clickResult) {
      self.api.assert.equal(clickResult.status, 0, `Unable to click ${locators.shiftFormContinueButton.description} using locator ${locators.shiftFormContinueButton.locator}`);
    });

    // default back to using CSS before leaving
    self.api.useCss();
    return self;
  },

  waitForFormNextPage: function() {
    const self = this;
    self.api.useXpath();
    self.api.waitForElementVisible(locators.postContinueHeadingText.locator, 15000);
    self.api.useCss();
    return self;
  },

  getImgForInCoin: function(cb) {
    const self = this;
    self.api.getAttribute(locators.imgInputCoin.locator, 'src', function(srcAttrResults) {
      self.api.assert.equal(srcAttrResults.status, 0, `Unable to get attribute 'src' from ${locators.imgInputCoin.description} using locator ${locators.imgInputCoin.locator}\``)
      cb(srcAttrResults.value);
    });
    return self;
  },

  getImgForOutCoin: function(cb) {
    const self = this;
    self.api.getAttribute(locators.imgOutputCoin.locator, 'src', function(srcAttrResults) {
      self.api.assert.equal(srcAttrResults.status, 0, `Unable to get attribute 'src' from ${locators.imgOutputCoin.description} using locator ${locators.imgOutputCoin.locator}`)
      cb(srcAttrResults.value);
    });
    return self;
  },

  getImgSrcForCoinsOnOrderDetails: function(cb) {
    const self = this;
    self.getImgForInCoin(function(inCoinImgSrc) {
      self.getImgForOutCoin(function(outCoinImgSrc) {
        cb({
          inCoinImg: inCoinImgSrc,
          outCoinImg: outCoinImgSrc
        })
      });
    });
    return self;
  },

  assertCoinsCarriedOverAfterClickingContinue: function() {
    const self = this;
    self.getShiftFormPairing(pair => {
      const { inCoin, outCoin } = pair;
      self.clickContinueButton();
      self.waitForFormNextPage();
      self.getImgSrcForCoinsOnOrderDetails(function(imgSrcPair) {
        const { inCoinImg, outCoinImg } = imgSrcPair;
        if (!inCoinImg.includes(inCoin.toLowerCase())) {
          self.assert.equal(true, false, `Expected input coin img source to contain input coin from prior form page. ${inCoin}:${inCoinImg}`)
        }
        if (!outCoinImg.includes(outCoin.toLowerCase())) {
          self.assert.equal(true, false, `Expected output coin img source to contain output coin from prior form page. ${outCoin}:${outCoinImg}`)
        }
      });
    });
    return self;
  }

};

export default {
  url: coin,
  commands: [ pageObjectMethods, commands ],
  elements: {}
};