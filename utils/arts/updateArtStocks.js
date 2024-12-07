import { getArtDataBtrade } from "../getArtDataBtrade.js";
import Art from "../../models/Art.js";

export const updateArtStock = async (artikul, count = 1) => {
  try {
    const { quant } = await getArtDataBtrade(artikul);

    console.log(`${count}. ${artikul} - ${quant} `);

    if (quant !== "N/A") {
      await Art.findOneAndUpdate(
        { artikul },
        { btradeStock: { value: quant, date: new Date() } }
      );
    }
    return quant;
  } catch (error) {
    console.error("Error updating art stock:", error);
  }
};

export const updateArtStocks = async () => {
  try {
    const arts = await Art.find();
    let count = 1;

    for (const art of arts) {
      await updateArtStock(art.artikul, count);
      count++;
    }
  } catch (error) {
    console.error("Error updating art stocks:", error);
  }
};
