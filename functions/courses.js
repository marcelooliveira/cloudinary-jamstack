const getRooms = require('./helpers/getRooms.js');
exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return await getRooms(event);
    } else {
        return formattedReturn(405, {});
    }
};