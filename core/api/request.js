const axios = require('axios');
const myLogger = require('../tools/myLogger');
const apiConfig = require('../../apiConfig.json');

const apiClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Espo-Authorization': apiConfig['Espo-Authorization'],
        'X-Api-Key': apiConfig['X-Api-Key'],
        'Content-Type': 'application/json',
    },
    maxBodyLength: Infinity,
});

const get = async (url) => {
    try {
        myLogger.info(`GET request to: ${url}`);
        const response = await apiClient.get(url);
        myLogger.info(`GET request successful: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        myLogger.error(`GET ${url} failed:`, error);
        throw error;
    }
};

const post = async (url, data) => {
    try {
        myLogger.info(`POST request to: ${url} with data: ${JSON.stringify(data)}`);
        const response = await apiClient.post(url, data);
        myLogger.info(`POST request successful: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        myLogger.error(`POST ${url} failed:`, error);
        throw error;
    }
};

const put = async (url, data) => {
    try {
        myLogger.info(`PUT request to: ${url} with data: ${JSON.stringify(data)}`);
        const response = await apiClient.put(url, data);
        myLogger.info(`PUT request successful: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        myLogger.error(`PUT ${url} failed:`, error);
        throw error;
    }
};

const del = async (url) => {
    try {
        myLogger.info(`DELETE request to: ${url}`);
        const response = await apiClient.delete(url);
        myLogger.info(`DELETE request successful: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        myLogger.error(`DELETE ${url} failed:`, error);
        throw error;
    }
};

module.exports = {
    get,
    post,
    put,
    del,
};
