

export async function getRemains() {

    try {

        const response = await fetch(`https://sharik.ua/product_rests/1302-0065/`, {
            cache: 'no-store', // Запрещаем кэширование
        })

        const responseText = await response.text();

        const lines = responseText.split('<pre>');
        const data = {};

        lines.forEach((line) => {
            const parts = line.split('=');
            if (parts.length === 2) {
                const key = parts[0].trim();
                const value = parseInt(parts[1], 10);
                data[key] = value;
            }
        });

        return data


    } catch (error) {
        console.log(error);

    }

}