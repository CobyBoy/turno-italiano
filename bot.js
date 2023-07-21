import puppeteer from 'puppeteer';
import { Telegram } from './Telegram.js';

const options = {
  headless: false,
  defaultViewport: null,
  args: ['--window-size=1500,1080', '--no-sandbox', '--disable-setuid-sandbox'],
};

const browser = await puppeteer.launch(options);
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();
const telebot = new Telegram();

await page.goto('https://prenotami.esteri.it/');

await navigationPromise;

await page.waitForSelector('#login-email');
await page.click('#login-email');
await page.type('#login-email', process.env.EMAIL)

await page.waitForSelector('#login-password');
await page.click('#login-password');
await page.type('#login-password', process.env.PASSWORD);

 
await page.waitForSelector('body > #main > .login-register-container');
await page.click('body > #main > .login-register-container');

await page.waitForSelector(
  '#main > .login-register-container > .login > #login-form > .button'
);
await page.click(
  '#main > .login-register-container > .login > #login-form > .button'
);

await navigationPromise;

await page.waitForSelector(
  '.header > .top-nav > .top-nav__container > .top-nav__languages > a:nth-child(3)'
);
await page.click(
  '.header > .top-nav > .top-nav__container > .top-nav__languages > a:nth-child(3)'
);

await navigationPromise;

await page.waitForSelector(
  '.app-menu > .app-menu__menu > li > #advanced > span'
);
await page.click('.app-menu > .app-menu__menu > li > #advanced > span');

await navigationPromise;

async function find() {
  return await page.evaluate(() => {
const lista = document.querySelector('#dataTableServices > tbody > tr:nth-child(1) > td:nth-child(5) > p');
    return lista.textContent.includes('No hay links asociados');
  });
}

try {
  await page.waitForSelector('#dataTableServices > tbody').then(()=>{console.log('table found');});
  await find().then((el) => {
    if (!el) telebot.sendTelegramMsg("Hay turno para la ciudadanía :)");
  });
}
catch (err) { 
  console.log (err);
}
finally {
  await browser.close();
}