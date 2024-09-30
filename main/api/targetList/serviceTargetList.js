const { post, del } = require('../../../core/api/request');
const myLogger = require('../../../core/tools/myLogger');

const create = async (data) => {
    const url = '/TargetList';
    try {
        myLogger.info(`Creating targetList with data: ${JSON.stringify(data)}`);
        const response = await post(url, data);
        myLogger.info(`targetList created successfully: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        myLogger.error(`Failed to create targetList: ${error.message}`);
        throw error;
    }
};

const deleted = async (id) => {
    const url = `/TargetList/${id}`;

    try {
        myLogger.info(`Deleting targetList with ID: ${id}`);
        const response = await del(url);
        myLogger.info(`Successfully deleted targetList: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        myLogger.error(`Failed to delete targetList with ID ${id}:`, error);
        throw error;
    }
};

module.exports = {
    create, deleted
};
