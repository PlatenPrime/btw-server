import { getStringSlice } from "../getStringSlice";

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}



const searchAvailLocationString = `data-qaid="presence_data"`;
const searchAvailLocationWord = "наявності";


// const stringSlice = getStringSlice(string, searchLocationWord, 10);




function extractAvailFromStringSlice(stringSlice) {

    const index = string?.indexOf(searchAvailLocationWord);
    if (index === -1) {
        return null; // Не найдено значение 
    }
 
    const substring = stringSlice?.slice(index - 20, index);
    const match = substring?.match("Немає");
    return match ? match[0] : null;

}
