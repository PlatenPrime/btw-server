import Comp from "../../models/Comp.js";
import { getArtDataAir, getArtDataBtrade, getArtDataBest, getArtDataSharte, getArtDataYumi } from "./index.js";


export async function getArtDataComp(artikul) {


    const comp = await Comp.findOne({ artikul });

    const yumiAction = comp?.competitorsLinks?.yumiLink ? getArtDataYumi(comp?.competitorsLinks?.yumiLink) : Promise.resolve(null);
    const sharteAction = comp?.competitorsLinks?.sharteLink ? getArtDataSharte(comp?.competitorsLinks?.sharteLink) : Promise.resolve(null);
    const airAction = comp?.competitorsLinks?.airLink ? getArtDataAir(comp?.competitorsLinks?.airLink) : Promise.resolve(null);
    const bestAction = comp?.competitorsLinks?.bestLink ? getArtDataBest(comp?.competitorsLinks?.bestLink) : Promise.resolve(null);


    let [btradeData, yumiData, sharteData, airData, bestData] = await Promise.allSettled([
        getArtDataBtrade(artikul),
        yumiAction,
        sharteAction,
        airAction,
        bestAction,
    ])

    console.log(btradeData, yumiData, airData, sharteData, bestData);


    let btrade, yumi, air, sharte, best

    if (btradeData && btradeData.status === "fulfilled" && btradeData.value) {
        btrade = {
            quant: btradeData.value?.quant,
            price: btradeData.value?.price,
        }
    }

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
        btrade,
        yumi,
        air,
        sharte,
        best,

    }

}