import axios from "axios";

const getBaseURL = () => {
    if (__DEV__) {
        return "http://192.168.15.177:3333";
    }
    return "https://nearby-eight.vercel.app";
};

export const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
});