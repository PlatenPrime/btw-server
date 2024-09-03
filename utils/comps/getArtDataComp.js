import Comp from "../../models/Comp.js";
import { 
    getArtDataAir, 
    getArtDataBtrade, 
    getArtDataBest, 
    getArtDataSharte, 
    getArtDataYumi,

    getArtDataAero,
    getArtDataBalun,
    getArtDataSvyato,
    getArtDataIdea
} from "./index.js";


export async function getArtDataComp(artikul) {


    const comp = await Comp.findOne({ artikul });

    const yumiAction = comp?.competitorsLinks?.yumiLink ? getArtDataYumi(comp?.competitorsLinks?.yumiLink) : Promise.resolve(null);
    const sharteAction = comp?.competitorsLinks?.sharteLink ? getArtDataSharte(comp?.competitorsLinks?.sharteLink) : Promise.resolve(null);
    const airAction = comp?.competitorsLinks?.airLink ? getArtDataAir(comp?.competitorsLinks?.airLink) : Promise.resolve(null);
    const bestAction = comp?.competitorsLinks?.bestLink ? getArtDataBest(comp?.competitorsLinks?.bestLink) : Promise.resolve(null);

    const aeroAction = comp?.competitorsLinks?.aeroLink ? getArtDataAero(comp?.competitorsLinks?.aeroLink) : Promise.resolve(null);
    const balunAction = comp?.competitorsLinks?.balunLink ? getArtDataBalun(comp?.competitorsLinks?.balunLink) : Promise.resolve(null);
    const svyatoAction = comp?.competitorsLinks?.svyatoLink ? getArtDataSvyato(comp?.competitorsLinks?.svyatoLink) : Promise.resolve(null);
    const ideaAction = comp?.competitorsLinks?.ideaLink ? getArtDataIdea(comp?.competitorsLinks?.ideaLink) : Promise.resolve(null);




    let [btradeData, yumiData, sharteData, airData, bestData, aeroData, balunData, svyatoData, ideaData] = await Promise.allSettled([
        getArtDataBtrade(artikul),
        yumiAction,
        sharteAction,
        airAction,
        bestAction,
        aeroAction,
        balunAction,
        svyatoAction,
        ideaAction
    ])

    console.log(btradeData, yumiData, airData, sharteData, bestData, aeroData, balunData, svyatoData, ideaData);


    let btrade, yumi, air, sharte, best, aero, balun, svyato, idea;

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
        btrade,
        yumi,
        air,
        sharte,
        best,

        aero,
        balun,
        svyato,
        idea,

    }

}