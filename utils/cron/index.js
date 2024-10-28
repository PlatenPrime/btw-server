import cron from "node-cron";

import { calculateDefs } from "../defs/calculateDefs.js";
import { updateAllArtDataComps } from "../comps/updateAllArtDataComps.js";
import { updateAllArtDataCompVariants } from "../comps/updateAllArtDataCompVariants.js";
import { sendCollectionsDataToTelegram } from "../reserve/sendCollectionsDataToTelegram.js";

export const cronTasks = () => {
  cron.schedule("0 7-15 * * 1-5", async () => {
    console.log("Calculating defs...");
    await calculateDefs();
    console.log("Calculating defs finished...");
  });

  cron.schedule("0 3 * * *", async () => {
    console.log("Updating all comps...");
    await updateAllArtDataComps();
    await updateAllArtDataCompVariants();
    console.log("Updating all comps finished...");
  });

  cron.schedule("0 3 * * *", async () => {
    console.log("Sending all collections to Telegram...");
    await sendCollectionsDataToTelegram();
    console.log("Sending all collections to Telegram finished");
  });
};
