let puppeteer = require("puppeteer");
let fs = require("fs");
const { profile } = require("console");
let credentialsFile = process.argv[2];

(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    login = credentials.login;
    email = credentials.email;
    pass = credentials.pass;
    college = credentials.college;
    degree = credentials.degree;
    stream = credentials.stream;
    percent = credentials.percent;
    blog = credentials.blog;
    por = credentials.por;
    cover = credentials.cover;
    exp = credentials.exp;
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    await tab.goto(login, {
        waitUntil: "networkidle2"
    });
    await tab.waitForSelector("#email");
    await tab.type("#email", email, { delay: 100 });
    await tab.waitForSelector("#password");
    await tab.type("#password", pass, { delay: 100 });
    await navigationHelper(tab,"#login_submit");

    await tab.waitForSelector(".nav-link.dropdown-toggle.profile_container");
    await tab.click(".nav-link.dropdown-toggle.profile_container");
    await tab.goto('https://internshala.com/student/interstitial', { waitUntil: "networkidle2" });
    //......................... graduation tab...............................
    await elementclick(tab,"#graduation-tab");
    await delay(3000)
    //graduation status
    await tab.waitForSelector("#degree_completion_status_pursuing");
    await tab.click("#degree_completion_status_pursuing");
    //college
    await tab.waitForSelector("#college");
    await tab.type("#college", college, { delay: 100 });
    await tab.waitForSelector(".chosen-single.chosen-default");
    await tab.click(".chosen-single.chosen-default");
    //start year
    await tab.waitForSelector(".chosen-results .active-result");
    let lengthofstartyear=await tab.$$(".chosen-results .active-result");
    await lengthofstartyear[4].click();
    console.log(lengthofstartyear.length);

    await tab.waitForSelector(".chosen-single.chosen-default");
    await tab.click(".chosen-single.chosen-default");
    //end year
    await tab.waitForSelector(".chosen-drop .chosen-results .active-result");
    let lengthofendyear=await tab.$$(".chosen-drop .chosen-results .active-result");
    await lengthofendyear[45].click();
    console.log(lengthofendyear.length);
    //degree
    await tab.waitForSelector("#degree");
    await tab.type("#degree", degree, { delay: 100 });
    //stream
    await tab.waitForSelector("#stream");
    await tab.type("#stream", stream, { delay: 100 });
    //percentage
    await tab.waitForSelector("#performance-college");
    await tab.type("#performance-college", percent, { delay: 100 });
    await elementclick(tab,"#college-submit");
    await delay(3000)
    //......................experiece tab.............................
    await elementclick(tab,".next-button");
    delay(2000);
    await elementclick(tab, ".skip-button.btn.btn-secondary");
    delay(2000);
    await elementclick(tab,".btn.btn-secondary.skip.skip-button");
    
    await tab.waitForSelector("#blog_link");
    await tab.type("#blog_link", blog, { delay: 100 });
    delay(3000);
    await elementclick(tab, "#save_work_samples");
    delay(1000);
    await elementclick(tab, "#por-resume");
    await tab.waitForSelector("#other_experiences_por_description");
    await tab.type("#other_experiences_por_description", por, { delay: 100 });
    delay(1000);
    await elementclick(tab,"#por-submit");
    delay(2000);
    await tab.goto('https://internshala.com/internships/matching-preferences', { waitUntil: "networkidle2" });
    await tab.goto('https://internshala.com/internship/detail/backend-development-work-from-home-job-internship-at-bizhives1592400012', { waitUntil: "networkidle2" });
    await elementclick(tab,".btn.btn-large");
    await elementclick(tab,".btn.btn-primary.education_incomplete");

    await tab.waitForSelector("#cover_letter");
    await tab.type("#cover_letter", cover, { delay: 100 });
    await tab.waitForSelector("#text_1205263");
    await tab.type("#text_1205263", exp, { delay: 100 });
    delay(1000)
    await elementclick(tab,"#submit");
    
})();
    async function navigationHelper(tab, selector) {
        await Promise.all([tab.waitForNavigation({
            waitUntil: "networkidle2"
        }), tab.click(selector)]);
    }
    async function elementclick(tab,selector){
        await tab.waitForSelector(selector);
        let ele=await tab.$(selector)
        await ele.click();
    }
    async function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }