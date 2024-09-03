import CompVariant from "../../models/CompVariant.js";
import {
    getArtDataAir,
    getArtDataBest,
    getArtDataSharte,
    getArtDataYumi,
    getArtDataAero,
    getArtDataBalun,
    getArtDataSvyato,
    getArtDataIdea,

} from "./index.js";


export async function getArtDataCompVariant(artikul) {

    const compVariant = await CompVariant.findOne({ artikul });


    const yumiAction = compVariant?.competitorsLinks?.yumiLink ? getArtDataYumi(compVariant?.competitorsLinks?.yumiLink) : Promise.resolve(null);
    const sharteAction = compVariant?.competitorsLinks?.sharteLink ? getArtDataSharte(compVariant?.competitorsLinks?.sharteLink) : Promise.resolve(null);
    const airAction = compVariant?.competitorsLinks?.airLink ? getArtDataAir(compVariant?.competitorsLinks?.airLink) : Promise.resolve(null);
    const bestAction = compVariant?.competitorsLinks?.bestLink ? getArtDataBest(compVariant?.competitorsLinks?.bestLink) : Promise.resolve(null);

    const aeroAction = compVariant?.competitorsLinks?.aeroLink ? getArtDataAero(compVariant?.competitorsLinks?.aeroLink) : Promise.resolve(null);
    const balunAction = compVariant?.competitorsLinks?.balunLink ? getArtDataBalun(compVariant?.competitorsLinks?.balunLink) : Promise.resolve(null);
    const svyatoAction = compVariant?.competitorsLinks?.svyatoLink ? getArtDataSvyato(compVariant?.competitorsLinks?.svyatoLink) : Promise.resolve(null);
    const ideaAction = compVariant?.competitorsLinks?.ideaLink ? getArtDataIdea(compVariant?.competitorsLinks?.ideaLink) : Promise.resolve(null);

    let [yumiData, sharteData, airData, bestData, aeroData, balunData, svyatoData, ideaData] = await Promise.allSettled([
        yumiAction,
        sharteAction,
        airAction,
        bestAction,

        aeroAction,
        balunAction,
        svyatoAction,
        ideaAction
    ]);

    console.log(yumiData, sharteData, airData, bestData, aeroData, balunData, svyatoData, ideaData);

    let yumi, sharte, air, best, aero, balun, svyato, idea;

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

    if (aeroData && aeroData.status === "fulfilled" && aeroData.value) {
        aero = {
            isAvailable: aeroData.value?.isAvailable,
            price: aeroData.value?.price,
        }
    } else {
        aero = {
            isAvailable: 'N/A',
            price: 'N/A',
        }
    }

    if (balunData && balunData.status === "fulfilled" && balunData.value) {
        balun = {
            isAvailable: balunData.value?.isAvailable,
            price: balunData.value?.price,
        }
    } else {
        balun = {
            isAvailable: 'N/A',
            price: 'N/A',
        }
    }

    if (svyatoData && svyatoData.status === "fulfilled" && svyatoData.value) {
        svyato = {
            isAvailable: svyatoData.value?.isAvailable,
            price: svyatoData.value?.price,
        }
    } else {
        svyato = {
            isAvailable: 'N/A',
            price: 'N/A',
        }
    }


    if (ideaData && ideaData.status === "fulfilled" && ideaData.value) {
        idea = {
            quant: ideaData.value?.quant,
            price: ideaData.value?.price,
        }
    } else {
        idea = {
            quant: 'N/A',
            price: 'N/A',
        }
    }





    return {
        yumi,
        sharte,
        air,
        best,

        aero,
        balun,
        svyato,
        idea,
    }
}