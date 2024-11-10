



import { getArtDataComp } from "./getArtDataComp.js";
import Comp from "../../models/Comp.js";



export async function updateArtDataComp(artikul) {


    console.log("Updating artikul:", artikul);
    
    const comp = await Comp.findOne({ artikul });

    if (!comp) {
        return;
    }

    const { btrade, yumi, air, sharte, best, aero, balun, svyato, idea, chudo }= await getArtDataComp(artikul);


    comp.avail.btrade = btrade.quant;
    comp.avail.yumi = yumi.quant;
    comp.avail.air = air.isAvailable;
    comp.avail.sharte = sharte.isAvailable;
    comp.avail.best = best.isAvailable;

    comp.avail.aero = aero.isAvailable;
    comp.avail.balun = balun.isAvailable;
    comp.avail.svyato = svyato.isAvailable;
    comp.avail.idea = idea.quant;
    comp.avail.chudo = chudo.quant;



    comp.price.btrade = btrade.price;
    comp.price.yumi = yumi.price;
    comp.price.air = air.price;
    comp.price.sharte = sharte.price;
    comp.price.best = best.price;

    comp.price.aero = aero.price;
    comp.price.balun = balun.price;
    comp.price.svyato = svyato.price;
    comp.price.idea = idea.price;
    comp.price.chudo = chudo.price;

    await comp.save();



    console.log("Finished updating artikul:", artikul);

    return comp;
}   