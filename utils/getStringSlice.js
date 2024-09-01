export function getStringSlice(string, searchLocationString , length) {
    const startIndex = string?.indexOf(searchLocationString);
    if (startIndex === -1) {
        return null; // Не найдено значение
    }
    const stringSlice = string?.slice(startIndex, startIndex + length)
    // console.log(stringSlice);
    return stringSlice;
}