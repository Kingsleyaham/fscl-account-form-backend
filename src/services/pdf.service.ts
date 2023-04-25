import puppeteer from "puppeteer";
import hbs from "handlebars";
import fs from "fs-extra";
import path from "path";

// import hbs from

class PDFService {
  async compileHbsToHtml(templateName: string, data: object) {
    const filePath = path.join(process.cwd(), "src/templates", `${templateName}.hbs`);

    const html = await fs.readFile(filePath, "utf-8");

    return hbs.compile(html)(data);
  }

  async generatePdf(templateName: string, data: object) {
    const browser = await puppeteer.launch({headless: true});

    const page = await browser.newPage();

    const content = await this.compileHbsToHtml(templateName, data);

    await page.setContent(content);

    const fileName = `${templateName}-${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;

    const pdfPath = path.join(process.cwd(), "src/assets/pdfs", fileName);

    // create pdf
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { bottom: 50, top: 20 },
    });

    await browser.close();

    return fileName;
  }
}

export const pdfService = new PDFService();
