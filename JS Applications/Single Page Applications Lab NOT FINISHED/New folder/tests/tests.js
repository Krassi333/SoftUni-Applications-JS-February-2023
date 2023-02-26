const { expect } = require('chai');
const { chromium } = require('playwright-chromium');

const options = { headless: false, slowMo: 200 };
let url = '';
//Всичко е с await отпред, всяко действие връща промис

describe('Testing', function () {
    let browser, page; //инициализация на променливите

    before(async () => browser = await chromium.launch(options));//отваря браузър ,beforeAll преди всички тестове
    beforeEach(async () => page = await browser.newPage());//отваря нова страница ,beforeEach преди всеки тест
    afterEach(async () => page.close()); // затваря страницата
    after(async () => browser.close()); //затваря браузъра

    it('Test describe', async function () {

        await page.goto(url); //зарежда се линка в страницата
        await page.screenshot({ path: 'screenshot.png' }); //създава screenshot

        await page.click('text = Login');// намира ел по зададения селектор и го кликва
        //text=Login селектор на библиотеката, търси елемент в който се съдържа този текст
        //text= "Login" текста трябва да съдържа само Login 
        //Може да работи и със CSS селектори, в документацията има инфо за видовете селектори

        await page.fill('input[name=email]', 'krassi@abv.bg'); // намира по селектора ел и попълва данните
        await page.fill('input[name=password]', '123456'); // намира по селектора ел и попълва данните

        await page.click('input[value=login]');
        await browser.close(); //затваря браузъра

        expect(true).to.be.true;
    })
})
