import { getArtDataCompVariant } from "./getArtDataCompVariant.js";
import CompVariant from "../../models/CompVariant.js";


export async function updateArtDataCompVariant(artikul) {

    console.log("Updating variant:", artikul);

    const compVariant = await CompVariant.findOne({ artikul });

    if (!compVariant) {
        return;
    }

    const { yumi, air, sharte, best, aero, balun, svyato, idea, chudo } = await getArtDataCompVariant(artikul);


    compVariant.avail.yumi = yumi?.quant;
    compVariant.avail.air = air?.isAvailable;
    compVariant.avail.sharte = sharte?.isAvailable;
    compVariant.avail.best = best?.isAvailable;

    compVariant.avail.aero = aero?.isAvailable;
    compVariant.avail.balun = balun?.isAvailable;
    compVariant.avail.svyato = svyato?.isAvailable;
    compVariant.avail.idea = idea?.quant;
    compVariant.avail.chudo = chudo?.quant;

    compVariant.price.yumi = yumi?.price;
    compVariant.price.air = air?.price;
    compVariant.price.sharte = sharte?.price;
    compVariant.price.best = best?.price;

    compVariant.price.aero = aero?.price;
    compVariant.price.balun = balun?.price;
    compVariant.price.svyato = svyato?.price;
    compVariant.price.idea = idea?.price;
    compVariant.price.chudo = chudo?.price;


    await compVariant.save();


    console.log("Finished updating variant:", artikul);

    return compVariant;

}