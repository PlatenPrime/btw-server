import { getArtDataComp } from "./getArtDataComp.js";
import CompStamp from "../../models/CompStamp.js";



export async function createCompStamp(artikul) {


    const { btrade, yumi, air, sharte, best } = await getArtDataComp(artikul);




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



export async function updateCompStamp(artikul) {

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


        const { btrade, yumi, air, sharte, best } = await getArtDataComp(artikul);


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


export async function createOrUpdateCompStamp(artikul) {

    const existCompStamp = await CompStamp.findOne({ artikul });


    if (existCompStamp) {
        const updatedCompStamp = await updateCompStamp(artikul);
        return updatedCompStamp;

    } else {
        const compStamp = await createCompStamp(artikul);
        return compStamp;
    }
}