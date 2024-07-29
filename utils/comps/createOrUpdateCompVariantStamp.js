import { getArtDataCompVariant } from "./getArtDataCompVariant.js";
import CompStamp from "../../models/CompStamp.js";



export async function createCompVariantStamp(artikul) {


    const { yumi, air, sharte, best } = await getArtDataCompVariant(artikul);


    const compVariantStamp = new CompStamp({
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
    await compVariantStamp.save();
    return compVariantStamp;
}




export async function updateCompVariantStamp(artikul) {

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


        const { yumi, air, sharte, best } = await getArtDataCompVariant(artikul);



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


export async function createOrUpdateCompVariantStamp(artikul) {
    const existCompVariantStamp = await CompStamp.findOne({ artikul });
    if (existCompVariantStamp) {
        return await updateCompVariantStamp(artikul);
    } else {
        return await createCompVariantStamp(artikul);
    }
}   