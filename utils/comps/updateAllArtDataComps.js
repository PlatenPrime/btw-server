import Comp from "../../models/Comp.js";
import { sendMessageToUser } from "../sendMessagesTelegram.js";
import { updateArtDataComp } from "./updateArtDataComp.js";



export async function updateAllArtDataComps() {

    console.log("Updating all comps...");
    
    const comps = await Comp.find({});

    for (const comp of comps) {
        const artikul = comp.artikul;
        console.log(artikul);
        await updateArtDataComp(artikul);
    }


    sendMessageToUser(
          "Всі конкуренти проаналізовані успішно!", "555196992")

    console.log("All comps updated.");
}