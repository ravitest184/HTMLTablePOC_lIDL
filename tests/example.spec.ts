import { test, expect } from '@playwright/test';
import fs from 'fs';

test('has title', async ({ page }) => {
     // Navigate to the AG-Grid example inventory page
     await page.goto('https://www.ag-grid.com/example-inventory/');

     // Wait for the grid to load
     await page.waitForSelector('.ag-root');
   
     // Grab all table headers
     const headers = await page.$$eval('.ag-header-cell-text', (nodes) =>
       nodes.map((node) => node.textContent?.trim() || '')
     );
   
     console.log('Headers:', headers);
   
     // Grab all rows in the AG-Grid table
     const rows = await page.$$('.ag-center-cols-viewport .ag-row');
   
     // Initialize an array to hold the extracted row data
     const tableData: any[] = [];
   
     // Loop through each row and extract the column data
     for (const row of rows) {
       // Grab the cells in each row
       const cells = await row.$$eval('div.ag-cell', (tds) =>
         tds.map((td) => td.textContent?.trim() || '')
       );
   
       // Map the cells data into an object dynamically using headers
       const rowData: Record<string, string> = {};
       headers.forEach((header, index) => {
         rowData[header] = cells[index] || '';
       });
   
       // Push the row data to the tableData array
       tableData.push(rowData);
     }
   
     // Print headers and table data
     console.log('Extracted Table Data:', JSON.stringify(tableData, null, 2));
   
     // Write the extracted data to a JSON file
     fs.writeFileSync('tableData.json', JSON.stringify({ headers, tableData }, null, 2));
});
