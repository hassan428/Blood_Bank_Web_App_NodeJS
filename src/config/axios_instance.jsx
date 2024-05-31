import axios from "axios";

const { VITE_AXIOS_INSTANCE } = import.meta.env

const axios_instance = axios.create({
    baseURL: VITE_AXIOS_INSTANCE,
});

export { axios_instance };