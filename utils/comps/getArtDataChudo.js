import { getStringSlice } from "../getStringSlice.js";



class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}


