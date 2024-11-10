import { getArtDataComp } from "./getArtDataComp.js";
import Comp from "../../models/Comp.js";
import CompStamp from "../../models/CompStamp.js";

export async function updateFullCompData(artikul) {

    console.log("Updating artikul:", artikul);

    const comp = await Comp.findOne({ artikul });
    const compStamp = await CompStamp.findOne({ artikul });

    if (!comp) {
        return;
    }

    const { btrade, yumi, air, sharte, best, aero, balun, svyato, idea, chudo } = await getArtDataComp(artikul);

    comp.avail.btrade = btrade?.quant;
    comp.avail.yumi = yumi?.quant;
    comp.avail.air = air?.isAvailable;
    comp.avail.sharte = sharte?.isAvailable;
    comp.avail.best = best?.isAvailable;

    comp.avail.aero = aero?.isAvailable;
    comp.avail.balun = balun?.isAvailable;
    comp.avail.svyato = svyato?.isAvailable;
    comp.avail.idea = idea?.quant;
    comp.avail.chudo = chudo.quant;

    comp.price.btrade = btrade?.price;
    comp.price.yumi = yumi?.price;
    comp.price.air = air?.price;
    comp.price.sharte = sharte?.price;
    comp.price.best = best?.price;

    comp.price.aero = aero?.price;
    comp.price.balun = balun?.price;
    comp.price.svyato = svyato?.price;
    comp.price.idea = idea?.price;
    comp.price.chudo = chudo.price;

    await comp.save();


    if (compStamp) {
        await updateCompStamp(artikul, { btrade, yumi, air, sharte, best, aero, balun, svyato, idea, chudo });
    } else {
        await createCompStamp(artikul, { btrade, yumi, air, sharte, best, aero, balun, svyato, idea, chudo });
    }

    console.log("Finished updating artikul:", artikul);

}


async function createCompStamp(artikul, { btrade, yumi, air, sharte, best, aero, balun, svyato, idea, chudo }) {


    const compStamp = new CompStamp({
        artikul,
        dates: [
            {
                date: new Date(),
                avail: {
                    btrade: btrade?.quant,
                    yumi: yumi?.quant,
                    air: air?.isAvailable,
                    sharte: sharte?.isAvailable,
                    best: best?.isAvailable,

                    aero: aero?.isAvailable,
                    balun: balun?.isAvailable,
                    svyato: svyato?.isAvailable,
                    idea: idea?.quant,
                    chudo: chudo?.quant,
                },
                price: {
                    btrade: btrade?.price,
                    yumi: yumi?.price,
                    air: air?.price,
                    sharte: sharte?.price,
                    best: best?.price,

                    aero: aero?.price,
                    balun: balun?.price,
                    svyato: svyato?.price,
                    idea: idea?.price,
                    chudo: chudo?.price,
                },
            },
        ],
    });
    await compStamp.save();
    return compStamp;
}


async function updateCompStamp(artikul, { btrade, yumi, air, sharte, best, aero, balun, svyato, idea, chudo }) {

    const today = new Date().setHours(0, 0, 0, 0); // Устанавливаем начало текущего дня
    const compStamp = await CompStamp.findOne({ artikul });


    if (compStamp) {
        const existingDateToday = compStamp.dates.find(entry => {
            const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
            return entryDate === today;
        });

        if (existingDateToday) {
            // Данные за сегодняшний день уже существуют, не обновляем
            console.log('Данные за сегодняшний день уже существуют, не обновляем');
            return compStamp;
        }

        // Добавляем новые данные
        const newDate = {
            date: new Date(),
            avail: {
                btrade: btrade?.quant,
                yumi: yumi?.quant,
                air: air?.isAvailable,
                sharte: sharte?.isAvailable,
                best: best?.isAvailable,

                aero: aero?.isAvailable,
                balun: balun?.isAvailable,
                svyato: svyato?.isAvailable,
                idea: idea?.quant,
                chudo: chudo?.quant,
            },
            price: {
                btrade: btrade?.price,
                yumi: yumi?.price,
                air: air?.price,
                sharte: sharte?.price,
                best: best?.price,

                aero: aero?.price,
                balun: balun?.price,
                svyato: svyato?.price,
                idea: idea?.price,
                chudo: chudo?.price,
            },
        };

        compStamp.dates.push(newDate);
        await compStamp.save();
        return compStamp;
    }


}