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

    const { btrade, yumi, air, sharte, best } = await getArtDataComp(artikul);

    comp.avail.btrade = btrade?.quant;
    comp.avail.yumi = yumi?.quant;
    comp.avail.air = air?.isAvailable;
    comp.avail.sharte = sharte?.isAvailable;
    comp.avail.best = best?.isAvailable;

    comp.price.btrade = btrade?.price;
    comp.price.yumi = yumi?.price;
    comp.price.air = air?.price;
    comp.price.sharte = sharte?.price;
    comp.price.best = best?.price;

    await comp.save();


    if (compStamp) {
        await updateCompStamp(artikul, { btrade, yumi, air, sharte, best });
    } else {
        await createCompStamp(artikul, { btrade, yumi, air, sharte, best });
    }

    console.log("Finished updating artikul:", artikul);

}


async function createCompStamp(artikul, { btrade, yumi, air, sharte, best }) {


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
                },
                price: {
                    btrade: btrade?.price,
                    yumi: yumi?.price,
                    air: air?.price,
                    sharte: sharte?.price,
                    best: best?.price,
                },
            },
        ],
    });
    await compStamp.save();
    return compStamp;
}


async function updateCompStamp(artikul, { btrade, yumi, air, sharte, best }) {

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
            },
            price: {
                btrade: btrade?.price,
                yumi: yumi?.price,
                air: air?.price,
                sharte: sharte?.price,
                best: best?.price,
            },
        };

        compStamp.dates.push(newDate);
        await compStamp.save();
        return compStamp;
    }


}