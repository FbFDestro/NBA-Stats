const axios = require('axios');
const databaseUrl = process.env.BD_API;

/**
 * @returns Database response after performing the query
 * @param {string} queryString - Query string
 */
const query = async (queryString) => {
  const { data } = await axios.post(databaseUrl, queryString);
  return data;
};

module.exports = query;
