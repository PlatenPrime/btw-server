import CompVariant from "../../models/CompVariant.js";
import { sendMessageToUser } from "../sendMessagesTelegram.js";
import {updateFullCompVariantData} from "./updateFullCompVariantData.js";



export async function updateAllArtDataCompVariants() {

    console.log("Updating all variants...");

    const compVariants = await CompVariant.find({});

    for (const compVariant of compVariants) {
        const artikul = compVariant.artikul;
        console.log(artikul);
        await updateFullCompVariantData(artikul);

    }


    sendMessageToUser(
        "Всі варіанти проаналізовані успішно!", "555196992")

    console.log("All variants updated.");
}

