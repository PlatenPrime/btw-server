import Comp from "../../models/Comp.js";
import { updateArtDataComp } from "./updateArtDataComp.js";



export async function updateAllArtDataComp() {

    console.log("Updating all comps...");
    
    const comps = await Comp.find({});

    for (const comp of comps) {
        const artikul = comp.artikul;
        console.log(artikul);
        await updateArtDataComp(artikul);
    }

    console.log("All comps updated.");
}