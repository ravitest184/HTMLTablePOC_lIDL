import { test, expect } from '@playwright/test';
import { ThemeBuilderPage } from '../pages/ThemeBuilder';

test('Verify row count in AG-Grid table', async ({ page }) => {
  const themeBuilder = new ThemeBuilderPage(page);
  await page.goto('https://www.ag-grid.com/theme-builder/');

  const rowCount = await themeBuilder.getRowCount();
  console.log('Row Count:', rowCount);

});
