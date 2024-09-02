import { getArtDataCompVariant } from "./getArtDataCompVariant.js";
import CompVariant from "../../models/CompVariant.js";
import CompStamp from "../../models/CompStamp.js";



export async function updateFullCompVariantData(artikul) {

    console.log("Updating artikul:", artikul);


    const compVariant = await CompVariant.findOne({ artikul });
    const compStamp = await CompStamp.findOne({ artikul });

    if (!compVariant) {
        return;
    }

    const { yumi, air, sharte, best, aero, balun, svyato, idea } = await getArtDataCompVariant(artikul);


    compVariant.avail.yumi = yumi?.quant;
    compVariant.avail.air = air?.isAvailable;
    compVariant.avail.sharte = sharte?.isAvailable;
    compVariant.avail.best = best?.isAvailable;

    compVariant.avail.aero = aero?.isAvailable;
    compVariant.avail.balun = balun?.isAvailable;
    compVariant.avail.svyato = svyato?.isAvailable;
    compVariant.avail.idea = idea?.quant;

    compVariant.price.yumi = yumi?.price;
    compVariant.price.air = air?.price;
    compVariant.price.sharte = sharte?.price;
    compVariant.price.best = best?.price;

    compVariant.price.aero = aero?.price;
    compVariant.price.balun = balun?.price;
    compVariant.price.svyato = svyato?.price;
    compVariant.price.idea = idea?.price;


    await compVariant.save();


    if (compStamp) {
        await updateCompVariantStamp(artikul, { yumi, air, sharte, best, aero, balun, svyato, idea });
    } else {
        await createCompVariantStamp(artikul, { yumi, air, sharte, best, aero, balun, svyato, idea });
    }

    console.log("Finished updating variant artikul:", artikul);

}




async function createCompVariantStamp(artikul, { yumi, air, sharte, best, aero, balun, svyato, idea }) {


    const compStamp = new CompStamp({
        artikul,
        dates: [
            {
                date: new Date(),
                avail: {
                    yumi: yumi?.quant,
                    air: air?.isAvailable,
                    sharte: sharte?.isAvailable,
                    best: best?.isAvailable,

                    aero: aero?.isAvailable,
                    balun: balun?.isAvailable,
                    svyato: svyato?.isAvailable,
                    idea: idea?.quant,
                },
                price: {
                    yumi: yumi?.price,
                    air: air?.price,
                    sharte: sharte?.price,
                    best: best?.price,

                    aero: aero?.price,
                    balun: balun?.price,
                    svyato: svyato?.price,
                    idea: idea?.price,
                },
            },
        ],
    });
    await compStamp.save();
    return compStamp;
}



async function updateCompVariantStamp(artikul, { yumi, air, sharte, best, aero, balun, svyato, idea }) {

    const today = new Date().setHours(0, 0, 0, 0); // Устанавливаем начало текущего дня
    const compVariantStamp = await CompStamp.findOne({ artikul });


    if (compVariantStamp) {
        const existingDateToday = compVariantStamp.dates.find(entry => {
            const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
            return entryDate === today;
        });

        if (existingDateToday) {
            // Данные за сегодняшний день уже существуют, не обновляем
            console.log('Данные за сегодняшний день уже существуют, не обновляем');
            return compVariantStamp;
        }


        // Добавляем новые данные
        const newDate = {
            date: new Date(),
            avail: {

                yumi: yumi?.quant,
                air: air?.isAvailable,
                sharte: sharte?.isAvailable,
                best: best?.isAvailable,

                aero: aero?.isAvailable,
                balun: balun?.isAvailable,
                svyato: svyato?.isAvailable,
                idea: idea?.quant,
            },
            price: {

                yumi: yumi?.price,
                air: air?.price,
                sharte: sharte?.price,
                best: best?.price,

                aero: aero?.price,
                balun: balun?.price,
                svyato: svyato?.price,
                idea: idea?.price,
            },
        };


        compVariantStamp.dates.push(newDate);
        await compVariantStamp.save();
        return compVariantStamp;

    }
}