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

    const { yumi, air, sharte, best } = await getArtDataCompVariant(artikul);


    compVariant.avail.yumi = yumi.quant;
    compVariant.avail.air = air.isAvailable;
    compVariant.avail.sharte = sharte.isAvailable;
    compVariant.avail.best = best.isAvailable;

    compVariant.price.yumi = yumi.price;
    compVariant.price.air = air.price;
    compVariant.price.sharte = sharte.price;
    compVariant.price.best = best.price;


    await compVariant.save();


    if (compStamp) {
        await updateCompVariantStamp(artikul, { yumi, air, sharte, best });
    } else {
        await createCompVariantStamp(artikul, { yumi, air, sharte, best });
    }

    console.log("Finished updating variant artikul:", artikul);

}




async function createCompVariantStamp(artikul, { yumi, air, sharte, best }) {


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
                },
                price: {
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



async function updateCompVariantStamp(artikul, { yumi, air, sharte, best }) {

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
            },
            price: {

                yumi: yumi?.price,
                air: air?.price,
                sharte: sharte?.price,
                best: best?.price,
            },
        };


        compVariantStamp.dates.push(newDate);
        await compVariantStamp.save();
        return compVariantStamp;

    }
}