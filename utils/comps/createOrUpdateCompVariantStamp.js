import { getArtDataCompVariant } from "./getArtDataCompVariant.js";
import CompStamp from "../../models/CompStamp.js";



export async function createCompVariantStamp(artikul) {


    const { yumi, air, sharte, best, aero, balun, svyato, idea, chudo  } = await getArtDataCompVariant(artikul);


    const compVariantStamp = new CompStamp({
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


        const { yumi, air, sharte, best, aero, balun, svyato, idea, chudo  } = await getArtDataCompVariant(artikul);



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