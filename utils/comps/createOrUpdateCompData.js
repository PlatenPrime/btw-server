import { getArtDataComp } from "./getArtDataComp.js";
import CompData from "../../models/CompData.js";



export async function createCompData(artikul) {


    const { btrade, yumi, air, sharte, best } = await getArtDataComp(artikul);




    const compData = new CompData({
        artikul,
        data: [
            {
                date: new Date(),
                avail: {
                    btrade: btrade.quant,
                    yumi: yumi.quant,
                    air: air.isAvailable,
                    sharte: sharte.isAvailable,
                    best: best.isAvailable,
                },
                price: {
                    btrade: btrade.price,
                    yumi: yumi.price,
                    air: air.price,
                    sharte: sharte.price,
                    best: best.price,
                },
            },
        ],
    });
    await compData.save();
    return compData;
}



export async function updateCompData(artikul) {
    const { btrade, yumi, air, sharte, best } = await getArtDataComp(artikul);

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
                btrade: btrade.quant,
                yumi: yumi.quant,
                air: air.isAvailable,
                sharte: sharte.isAvailable,
                best: best.isAvailable,
            },
            price: {
                btrade: btrade.price,
                yumi: yumi.price,
                air: air.price,
                sharte: sharte.price,
                best: best.price,
            },
        };

        compData.data.push(updatedData);
        await compData.save();

        return compData;
    }

   
}