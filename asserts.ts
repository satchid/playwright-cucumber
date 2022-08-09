// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }
  async assertText(locator,text) {
    if(text.startsWith("regexp:")){
        text=text.replace('regexp:','')
        await expect(this.page.locator(locator)).toHaveText(text)
    } else {
        await expect(this.page.locator(locator)).toHaveText(text)
    }
  }
  async assertTextPresent(locator,text) {
    await expect(this.page.locator(locator)).toContainText(text)
  }

  async assertNotText(locator,text) {
    await expect(this.page.locator(locator)).not.toHaveText(text)
  }

  async assertLocation(url,text) {
    await expect(this.page).toHaveURL(url)
  }

  async waitForTitle(title,text) {
    await expect(this.page).toHaveTitle(title)
  }

  async assertTextNotPresent(locator,text) {
    await expect(this.page.locator(locator)).not.toContainText(text)
  }

  async assertElementPresent(locator,text) {
    await expect(this.page.locator(locator)).toBeVisible()
  }
  
  async assertElementsPresent(locator,text) {
    await expect(this.page.$$(locator)).toBeDefined()
  }

  async assertElementNotPresent(locator,text) {
    await expect(this.page.locator(locator)).not.toBeVisible()
  }

  async waitForElementPresent(locator,text) {
    await this.page.waitForSelector(locator,{ state: 'visible' })
  }
  
  async assertValue(locator,value) {
    await expect(this.page.locator(locator)).toHaveValue(value)
  }

  async assertNotValue(locator,value) {
    await expect(this.page.locator(locator)).not.toHaveValue(value)
  }

  async storeValue(locator) {
    return this.page.locator(locator).inputValue()
  }

  async assertVisible(locator,value) {
    await expect(this.page.locator(locator)).toBeVisible()
  }
  async assertNotVisible(locator,value) {
    await expect(this.page.locator(locator)).not.toBeVisible()
  }

  async waitForVisible(locator,value) {
    await this.page.waitForSelector(locator,{ state: 'visible' })
  }

  async waitForNotVisible(locator,value) {
    await this.page.waitForSelector(locator,{ state: 'hidden' })
  }

  async waitForText(locator,text) {
    await this.page.waitForSelector(locator,{ state: 'visible' })
    await expect(this.page.locator(locator)).toContainText(text)
  }
  
  async typeText(locator,text) {
    await this.page.locator(locator).fill(text)
  }


  async clickAndWait(locator,text) {
    await this.page.locator(locator).click()
    await expect(this.page.locator("#global_loading_indicator")).not.toBeVisible()
  }

  async click(locator,text) {
    await this.page.locator(locator).click()
    await expect(this.page.locator("#global_loading_indicator")).not.toBeVisible()
  }

  async select(locator,text) {
    await this.page.selectOption(locator,{label:text})
  }

  async assertCssCount(locator,len) {
    const list = this.page.locator(locator);
    await expect(list).toHaveCount(len);
  }

  async verifyCssCount(locator,len) {
    const list = this.page.locator(locator);
    await expect(list).toHaveCount(len);
  }

  async check(locator,len) {
    if (await (this.page.locator(locator)).isChecked()) {
      await expect(this.page.locator(locator)).toBeChecked()
    } else {
      await this.page.locator(locator).click()
      await expect(this.page.locator("#global_loading_indicator")).not.toBeVisible()
      await expect(this.page.locator(locator)).toBeChecked()
    }
  }

  async uncheck(locator,len) {
    if (await (this.page.locator(locator)).isChecked()) {
      await this.page.locator(locator).click()
      await expect(this.page.locator("#global_loading_indicator")).not.toBeVisible()
      await expect(this.page.locator(locator)).not.toBeChecked()
    } else {
      await expect(this.page.locator(locator)).not.toBeChecked()
    }
  }

  async assertAttribute(locator,key, value) {
    await expect(this.page.locator(locator)).toHaveAttribute(key,value)
  }

  async assertChecked(locator,value) {
    await expect(this.page.locator(locator)).toBeChecked()
  }

  async assertNotChecked(locator,value) {
    await expect(this.page.locator(locator)).not.toBeChecked()
  }

  async assertEditable(locator,value) {
    await expect(this.page.locator(locator)).toBeEditable()
  }

  async assertNotEditable(locator,value) {
    await expect(this.page.locator(locator)).not.toBeEditable()
  }

  async assertSelectedLabel(selector,label) {
    if( label == 'None') {
        await expect(this.page.locator(selector)).toHaveValue("")
    } else {
        let elem= this.page.locator(selector)
        let chil=elem.locator(' option[selected="selected"]')
        if (await chil.count()!=0){
            await expect(chil).toHaveText(label)
        } else {
            chil=elem.locator(' option')
            await expect(this.page.locator(selector)).toHaveValue(label)
        }
    }

    // try {
    //     await this.page.waitForSelector(selector+' option[selected="selected"]', { timeout: 5000 })
    //     await expect(this.page.locator(selector+' option[selected="selected"]')).toHaveText(label)
    // } catch (error) {
    //     if( label == 'None') {
    //         await expect(this.page.locator(selector)).toBeEmpty();
    //     } else {
    //         await expect(this.page.locator(selector)).toHaveText(label)
    //     }
    // }
    
  }
}