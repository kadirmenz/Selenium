import { before, beforeEach, afterEach, describe, it } from 'mocha';
import { Builder, By, Capabilities, WebDriver } from 'selenium-webdriver';
import { assert } from 'chai';

let driver: WebDriver;

const setupChromeDriver = async () => {
  console.log('Setting up Chrome Driver...');
  try {
    driver = await new Builder().forBrowser('chrome').build();
    console.log('Driver setup complete.');
    return driver;
  } catch (error) {
    console.error('Error setting up Chrome Driver:', error);
    throw error;
  }
};

const closeDriver = async () => {
  if (driver) {
    console.log('Closing driver...');
    await driver.quit();
    console.log('Driver closed.');
  }
};

describe('TicTacToe3D tests', function () {
  this.timeout(20000); // Extend timeout if necessary

  before(async function () {
    console.log('Global setup...');
    await setupChromeDriver();
  });

  beforeEach(async function () {
    console.log('Opening website...');
    try {
      await driver.get("https://tictactoe3d.web.app/");
    } catch (error) {
      console.error('Failed to open website:', error);
      throw error;
    }
  });

  afterEach(async function () {
    console.log('Running afterEach...');
    await closeDriver();
  });

  after(async function () {
    console.log('Global teardown...');
    await closeDriver();
  });

  it('Open Website page and check text', async function () {
    console.log('Running test case...');
    const element = await driver.findElement(By.tagName('body'));
    const bodyText = await element.getText();
    assert.include(bodyText, 'TicTacToe3D', 'Page should contain text "TicTacToe3D"');
  });
});
