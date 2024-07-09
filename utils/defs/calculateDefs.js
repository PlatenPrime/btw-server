
import Def from '../../models/Def.js';
import { getArtDataBtrade } from '../getArtDataBtrade.js';
import { sendMessageToUser } from '../sendMessagesTelegram.js';

import Art from '../../models/Art.js';
import Pos from '../../models/Pos.js';
import { getRemains } from '../getRemains.js';







function isNewerThanThreeYears(dateString) {
    if (!dateString) {
        return true; // Если даты нет, считаем, что позиция актуальна
    }

    // Преобразование строки даты в объект Date
    const dateParts = dateString.split('.');
    const year = parseInt(dateParts[1], 10) + 2000; // Добавляем 2000 к году
    const month = parseInt(dateParts[0], 10) - 1; // Вычитаем 1 из месяца (начинается с 0)

    const posDate = new Date(year, month);

    // Проверка, новее ли дата чем текущая дата минус 3 года
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    return posDate >= threeYearsAgo;
}




function optimizePoses(poses, arts) {


    const correctRows = ["01-01", "06-08", "10-12", "14-16", "18-20", "22-24", "27-29"]; // TODO: Заменить в будущем на константы из базы данных


    return poses
        .filter(pos => pos.sklad === "pogrebi" && isNewerThanThreeYears(pos.date))
        .filter((pos) => /^\d{4}-\d{4}$/.test(pos.artikul))
        .filter((pos) => pos?.quant !== 0)
        .map((pos) => {
            const art = arts.find((art) => art?.artikul === pos?.artikul);
            if (art) {
                pos.nameukr = art.nameukr;
            }
            return pos;
        })
        .filter((pos) => pos !== null)
        .filter((pos) => correctRows.includes(pos.rowTitle))
        .reduce((stocks, currentStock) => {

            const existingStock = stocks.find((stock) => stock.artikul === currentStock.artikul);

            if (existingStock) {
                existingStock.quant += currentStock.quant;
            } else {
                stocks.push({
                    artikul: currentStock.artikul,
                    quant: currentStock.quant,
                    nameukr: currentStock.nameukr
                });
            }
            return stocks;
        }, [])
        .sort((a, b) => a.artikul.localeCompare(b.artikul));
}




export async function calculateDefs() {
    try {
        console.log('Начало calculateDefs');
        sendMessageToUser(`
       Розрахунок оптимальних позицій...
        `,
            "555196992")

        const [poses, arts] = await Promise.all([Pos.find(), Art.find()]);
        console.log(`Найдено позиций: ${poses.length}`);
        console.log(`Найдено артикулов: ${arts.length}`);


        const stocks = optimizePoses(poses, arts);
        console.log(`Оптимизировано позиций: ${stocks.length}`);

        let newDefs = [];


        sendMessageToUser(`
        Рохрахунок дефіцитів почався...
         `,
             "555196992")

        for (const stock of stocks) {

            const { quant } = await getArtDataBtrade(stock.artikul);
            console.log(`Артикул: ${stock.nameukr} - ${quant}`);

            if (quant && stock.quant >= quant) {
                newDefs.push({
                    artikul: stock.artikul,
                    nameukr: stock.nameukr,
                    stockQuant: stock.quant,
                    btradeQuant: quant,
                });
            }
        }

        const def = new Def({
            items: newDefs
        });
        await def.save();

        sendMessageToUser(`
        ${newDefs?.length > 0 ?
                `Є наступні дефіцити:
            ${newDefs?.map(def => `    ${def?.artikul} - ${def?.stockQuant - def?.btradeQuant} шт.
            `)}`
                :
                "Дефіцитів немає"
            }
        `,
            "555196992")

    } catch (error) {
        console.error(error);
    }
}




export async function calculateRemainsDefs() {



    const [poses, arts] = await Promise.all([Pos.find(), Art.find()]);
    console.log(`Найдено позиций: ${poses.length}`);
    console.log(`Найдено артикулов: ${arts.length}`);

    const remains = await getRemains();
    const stocks = optimizePoses(poses, arts);
    console.log(`Оптимизировано позиций: ${stocks.length}`);

    let newDefs = [];

    for (const stock of stocks) {
        const quant = remains[stock.artikul];
        if (quant && stock.quant >= quant) {
            newDefs.push({
                artikul: stock.artikul,
                nameukr: stock.nameukr,
                stockQuant: stock.quant,
                btradeQuant: quant,
            });
        }
    }
    return newDefs

}
