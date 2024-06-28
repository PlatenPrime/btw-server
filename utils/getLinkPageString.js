

export async function getLinkPageString(link) {
    try {

        const response = await fetch(link, {
            cache: 'no-store', // Запрещаем кэширование
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const htmlString = await response.text();

        return htmlString;

    } catch (error) {
        console.error(`Failed to fetch link: ${link}. Error: ${error.message}`);
    }
}