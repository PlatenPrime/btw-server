import { getArtDataComp } from "./getArtDataComp.js";
import CompData from "../../models/CompData.js";



export async function createCompDataFunction(artikul) {


    const { btrade, yumi, air, sharte, best } = await getArtDataComp(artikul);

    console.log(artikul, btrade, yumi, air, sharte, best);
    


    const compData = new CompData({
        artikul,
        data: [
            {
                date: new Date(),
                avail: {
                    btrade: btrade.quant,
                    yumi: yumi.quant,
                    air: air.isAvailable,
                    sharte: sharte.isAvailable,
                    best: best.isAvailable,
                },
                price: {
                    btrade: btrade.price,
                    yumi: yumi.price,
                    air: air.price,
                    sharte: sharte.price,
                    best: best.price,
                },
            },
        ],
    });
    await compData.save();
    return compData;
}