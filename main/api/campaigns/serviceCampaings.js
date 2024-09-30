const { post, del } = require('../../../core/api/request');
const myLogger = require('../../../core/tools/myLogger');

const create = async (data) => {
    const url = '/Campaign';
    try {
        myLogger.info(`Creating campaing with data: ${JSON.stringify(data)}`);
        const response = await post(url, data);
        myLogger.info(`campaing created successfully: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        myLogger.error(`Failed to create campaing: ${error.message}`);
        throw error;
    }
};

const deleted = async (id) => {
    const url = `/Campaign/${id}`;

    try {
        myLogger.info(`Deleting campaing with ID: ${id}`);
        const response = await del(url);
        myLogger.info(`Successfully deleted campaing: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        myLogger.error(`Failed to delete campaing with ID ${id}:`, error);
        throw error;
    }
};

module.exports = {
    create, deleted
};
