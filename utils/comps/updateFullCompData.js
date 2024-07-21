import { getArtDataComp } from "./getArtDataComp.js";
import Comp from "../../models/Comp.js";
import CompData from "../../models/CompData.js";

export async function updateFullCompData(artikul) {

    console.log("Updating artikul:", artikul);

    const comp = await Comp.findOne({ artikul });
    const compData = await CompData.findOne({ artikul });

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


    if (compData) {
        await updateCompData(artikul, { btrade, yumi, air, sharte, best });
    } else {
        await createCompData(artikul, { btrade, yumi, air, sharte, best });
    }

    console.log("Finished updating artikul:", artikul);

}





async function createCompData(artikul, { btrade, yumi, air, sharte, best }) {


    const compData = new CompData({
        artikul,
        data: [
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
    await compData.save();
    return compData;
}


async function updateCompData(artikul, { btrade, yumi, air, sharte, best }) {

    const today = new Date().setHours(0, 0, 0, 0); // Устанавливаем начало текущего дня
    const compData = await CompData.findOne({ artikul });


    if (compData) {
        const existingDataToday = compData.data.find(entry => {
            const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
            return entryDate === today;
        });

        if (existingDataToday) {
            // Данные за сегодняшний день уже существуют, не обновляем
            console.log('Данные за сегодняшний день уже существуют, не обновляем');
            return compData;
        }

        // Добавляем новые данные
        const updatedData = {
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

        compData.data.push(updatedData);
        await compData.save();

        return compData;
    }


}