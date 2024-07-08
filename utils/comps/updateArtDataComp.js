



import { getArtDataComp } from "./getArtDataComp.js";
import Comp from "../../models/Comp.js";



export async function updateArtDataComp(artikul) {


    console.log("Updating artikul:", artikul);
    
    const comp = await Comp.findOne({ artikul });

    if (!comp) {
        return;
    }

    const { btrade, yumi, air, sharte, best }= await getArtDataComp(artikul);


    comp.avail.btrade = btrade.quant;
    comp.avail.yumi = yumi.quant;
    comp.avail.air = air.isAvailable;
    comp.avail.sharte = sharte.isAvailable;
    comp.avail.best = best.isAvailable;

    comp.price.btrade = btrade.price;
    comp.price.yumi = yumi.price;
    comp.price.air = air.price;
    comp.price.sharte = sharte.price;
    comp.price.best = best.price;

    await comp.save();



    console.log("Finished updating artikul:", artikul);

    return comp;
}   