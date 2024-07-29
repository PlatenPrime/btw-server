import CompVariant from "../../models/CompVariant.js";
import { getArtDataAir,  getArtDataBest, getArtDataSharte, getArtDataYumi } from "./index.js";


export async function getArtDataCompVariant(artikul) {

    const compVariant = await CompVariant.findOne({ artikul });


    const yumiAction = compVariant?.competitorsLinks?.yumiLink ? getArtDataYumi(compVariant?.competitorsLinks?.yumiLink) : Promise.resolve(null);
    const sharteAction = compVariant?.competitorsLinks?.sharteLink ? getArtDataSharte(compVariant?.competitorsLinks?.sharteLink) : Promise.resolve(null);
    const airAction = compVariant?.competitorsLinks?.airLink ? getArtDataAir(compVariant?.competitorsLinks?.airLink) : Promise.resolve(null);
    const bestAction = compVariant?.competitorsLinks?.bestLink ? getArtDataBest(compVariant?.competitorsLinks?.bestLink) : Promise.resolve(null);   

    let [ yumiData, sharteData, airData, bestData] = await Promise.allSettled([ 
        yumiAction,
        sharteAction,
        airAction,
        bestAction,
    ]);

    console.log(yumiData, sharteData, airData, bestData);

    let yumi, sharte, air, best

    if (yumiData && yumiData.status === "fulfilled" && yumiData.value) {
        yumi = {
            quant: yumiData.value?.quant,
            price: yumiData.value?.price,
        }
    } else {
        yumi = {
            quant: 'N/A',
            price: 'N/A',
        }
    }


    if (sharteData && sharteData.status === "fulfilled" && sharteData.value) {
        sharte = {
            isAvailable: sharteData.value?.isAvailable,
            price: sharteData.value?.price,
        }   
    } else {
        sharte = {
            isAvailable: 'N/A',
            price: 'N/A',
        }
    }

    if (airData && airData.status === "fulfilled" && airData.value) {
        air = {
            isAvailable: airData.value?.isAvailable,
            price: airData.value?.price,
        }
    } else {
        air = {
            isAvailable: 'N/A',
            price: 'N/A',
        }
    }

    if (bestData && bestData.status === "fulfilled" && bestData.value) {
        best = {
            isAvailable: bestData.value?.isAvailable,
            price: bestData.value?.price,
        }
    } else {
        best = {
            isAvailable: 'N/A',
            price: 'N/A',
        }
    }

    return {
        yumi,
        sharte,
        air,
        best
    }
}