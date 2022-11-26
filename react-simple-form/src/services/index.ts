import axios, { AxiosInstance } from 'axios';

//axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

axios.defaults.headers.common['Access-Control-Allow-Origin'] =
    'https://amazon-api.sellead.com';

//axios.defaults.withCredentials = true;

const api: AxiosInstance = axios.create({
    baseURL: 'https://amazon-api.sellead.com',
});

const getCountriesData = async () => {
    return await api.get('/country');
};

const getCitiesData = async () => {
    return await api.get('/city');
};

export { getCitiesData, getCountriesData };
