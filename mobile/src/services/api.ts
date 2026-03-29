import axios from "axios";

// Forçamos o link do Railway para o celular buscar na nuvem
export const api = axios.create({
    baseURL: "https://nearby-production-329b.up.railway.app",
    timeout: 10000,
});