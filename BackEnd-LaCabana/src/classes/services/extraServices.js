import axios from "axios";
import cheerio from "cheerio";

export class ExtraServices {
  constructor() {}

  static async getDollarRate() {
    try {
      const response = await axios.get("https://www.bcv.org.ve/"); // Replace with the actual URL of the Central Bank's website

      // Load the HTML content into Cheerio
      const $ = cheerio.load(response.data);

      // Use Cheerio selectors to extract the exchange rate from the page
      const dollarRate = $(
        "#dolar > div > div > div.col-sm-6.col-xs-6.centrado > strong"
      ).text();

      return dollarRate;
    } catch (error) {
      console.error("Error retrieving dollar rate:", error);
      return null;
    }
  }
}
