const { Given, When, Then } = require("@cucumber/cucumber");

Given("Bob opens Amazon website", { timeout: 60 * 1000 }, async function () {
    await this.openUrl('http://www.amazon.com/');
});

When("Bob goes to Careers section", async function () {
    await this.page.click('text=Careers');
});

Then("Bob will see all job openings at Amazon", async function () {
    await this.page.click("a[href='/job_categories/software-development']");
    await this.page.waitForSelector('text=Software Development');
});