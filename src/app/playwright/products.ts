import { chromium } from "playwright";

interface Product {
  title: string;
  link: string;
  price: string;
  image: string;
}

interface GetScrapeProductsParams {
  business: string;
  productName: string;
}

export async function getScrapeProducts({
  business,
  productName,
}: GetScrapeProductsParams): Promise<Product[]> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const products: Product[] = [];

  if (business === "sercoplus") {
    await page.goto("https://www.sercoplus.com/", {
      waitUntil: "domcontentloaded",
    });

    await page.type("#search_widget form input[type=text]", productName);
    await page.waitForTimeout(1000);
    await page.click("#search_widget form button[type=submit]");

    await page.waitForSelector("#js-product-list article", { timeout: 5000 });

    const data = await page.evaluate(() => {
      const items = document.querySelectorAll<HTMLElement>(
        "#js-product-list article"
      );
      const scrapedProducts: Product[] = [];

      items.forEach((item) => {
        const titleElement =
          item.querySelector<HTMLAnchorElement>("h5.product-name a");
        const priceElement = item.querySelector<HTMLSpanElement>("span.price");
        const imageElement = item.querySelector<HTMLImageElement>(
          "a.product-cover-link img"
        );

        if (titleElement && priceElement && imageElement) {
          scrapedProducts.push({
            title: titleElement.innerText.trim(),
            link: titleElement.href,
            price: priceElement.innerText.trim(),
            image: imageElement.src,
          });
        }
      });

      return scrapedProducts;
    });

    products.push(...data);
  }

  await context.close();
  await browser.close();

  return products;
}
