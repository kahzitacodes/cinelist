import axios from "axios";

const apiURLs = {
    development: "http://localhost:4001",
    production: "https://deploy-cinelist-api.cyclic.app"
};

const api = axios.create({
    baseURL: apiURLs[process.env.NODE_ENV]
});

export { api };