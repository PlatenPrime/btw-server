import Comp from "../../models/Comp.js";
import { sendMessageToUser } from "../sendMessagesTelegram.js";
import { updateFullCompData } from "./updateFullCompData.js";



export async function updateAllArtDataComps() {

    console.log("Updating all comps...");

    const comps = await Comp.find({});

    for (const comp of comps) {
        const artikul = comp.artikul;
        console.log(artikul);
        await updateFullCompData(artikul);

    }


    sendMessageToUser(
        "Всі конкуренти проаналізовані успішно!", "555196992")

    console.log("All comps updated.");
}