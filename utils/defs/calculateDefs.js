


import mongoose from 'mongoose';
import Def from '../../models/Def.js';
import { getArtDataBtrade } from '../getArtDataBtrade.js';
import Art from '../../models/Art.js';
import Pos from '../../models/Pos.js';




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









export async function calculateDefs() {
    try {

        const poses = await Pos.find();
        const arts = await Art.find();
        const correctRows = ["06-08", "10-12", "14-16", "18-20", "22-24", "27-29"]; // TODO: Заменить в будущем на константы из базы данных


        const stocks = poses
            .filter(pos => pos.sklad === "pogrebi" && isNewerThanThreeYears(pos.date))
            .filter((pos) => /^\d{4}-\d{4}$/.test(pos.artikul))
            .filter((pos) => pos?.quant !== 0)
            .map((pos) => {
                const art = arts.find((art) => art?.artikul === pos?.artikul);
                if (!art) {
                    return null;
                }
                return {
                    ...pos,
                    nameukr: art.nameukr,

                };
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

        let newDefs = [];

   


        for (const stock of stocks) {

        
            

            const { quant } = await getArtDataBtrade(stock.artikul);

       

            if (quant && stock.quant >= quant) {
                newDefs.push({
                    artikul: stock.artikul,
                    nameukr: stock.nameukr,
                    stockQuant: stock.quant,
                    bradeQuant: quant,
                });
            }
        }

        const def = new Def({
            items: newDefs
        });
        await def.save();

    } catch (error) {
        console.error(error);
    }
}




