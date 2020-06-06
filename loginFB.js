const puppeteer = require("puppeteer")
const chalk = require("chalk");
var fs = require("fs");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

const getData = async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();

    await page.goto('https://facebook.com');

    // Login
    await page.type('#email', 'username');
    await page.type('#pass', 'password');
    await page.click('#loginbutton input');

    await page.waitForNavigation();

    // enter url in page
    await page.goto(`https://member.lazada.co.th/user/login?spm=a2o4m.home.header.d5.1125515fjOYliI&redirect=https%3A%2F%2Fwww.lazada.co.th%2F`);
    const text = await page.$x("//button[contains(text(), 'Facebook')]")
    if (text.length) {
      await text[0].click();
    }
    await page.waitForNavigation();
    // // Get cookies
    const cookies = await page.cookies();

    // // Use cookies in other tab or browser
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    await page2.goto('https://lazada.co.th'); // Opens page as logged user
    // await page.waitForNavigation();
    await page.screenshot({ path: 'example.png', fullPage: true });
    // await page2.waitForSelector(".navbar__username");
    // var titleNodeList = document.querySelectorAll(`.navbar__username`);
    // console.log('titleNodeList:', titleNodeList.innerText.trim())
    // const data = []
    // fs.writeFile("username.json", JSON.stringify(data), function (err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    // await browser.close();
    // var news = await page.evaluate(() => {
    //   var titleNodeList = document.querySelectorAll(`a.storylink`);
    //   var ageList = document.querySelectorAll(`span.age`);
    //   var scoreList = document.querySelectorAll(`span.score`);
    //   var titleLinkArray = [];
    //   for (var i = 0; i < titleNodeList.length; i++) {
    //     titleLinkArray[i] = {
    //       title: titleNodeList[i].innerText.trim(),
    //       link: titleNodeList[i].getAttribute("href"),
    //       age: ageList[i].innerText.trim(),
    //       score: scoreList[i].innerText.trim()
    //     };
    //   }
    //   return titleLinkArray;
    // });
    // // console.log(news);
    // await browser.close();
    // // Writing the news inside a json file
    // fs.writeFile("hackernews.json", JSON.stringify(news), function (err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    // await browser.close();
    console.log(error("Browser Closed"));
  }
}

getData()
