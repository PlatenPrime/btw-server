import { getArtDataCompVariant } from "./getArtDataCompVariant.js";
import CompVariant from "../../models/CompVariant.js";


export async function updateArtDataCompVariant(artikul) {

    console.log("Updating variant:", artikul);

    const compVariant = await CompVariant.findOne({ artikul });

    if (!compVariant) {
        return;
    }

    const { yumi, air, sharte, best } = await getArtDataCompVariant(artikul);


    compVariant.avail.yumi = yumi.quant;
    compVariant.avail.air = air.isAvailable;
    compVariant.avail.sharte = sharte.isAvailable;
    compVariant.avail.best = best.isAvailable;

    compVariant.price.yumi = yumi.price;
    compVariant.price.air = air.price;
    compVariant.price.sharte = sharte.price;
    compVariant.price.best = best.price;


    await compVariant.save();


    console.log("Finished updating variant:", artikul);

    return compVariant;

}