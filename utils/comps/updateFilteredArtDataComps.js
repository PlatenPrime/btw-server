import Comp from "../../models/Comp.js";
import { sendMessageToUser } from "../sendMessagesTelegram.js";
import { updateFullCompData } from "./updateFullCompData.js";



export async function updateFilteredArtDataComps(comps) {

    console.log("Updating filtered comps...");


    for (const comp of comps) {
        const artikul = comp.artikul;
        console.log(artikul);
        await updateFullCompData(artikul);

    }


    sendMessageToUser(
        "Відфільтровані конкуренти проаналізовані успішно!", "555196992")

    console.log("Filtered comps updated.");
}