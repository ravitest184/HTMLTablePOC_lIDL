import { Page, Locator } from '@playwright/test';

export class ThemeBuilderPage {
  readonly page: Page;
  readonly allRows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define all locators in the constructor like JavaScript example
    this.allRows = page.locator('div[role="row"]');
  }
  
  /**
   * Get total number of rows in the table (count of <div role="row">)
   * @returns Promise<number>
   */
  async getRowCount(): Promise<number> {
    return await this.allRows.count();
  }
}

export default ThemeBuilderPage;
