const axios = require('axios');
const buildQuery = require('./buildQuery');
const databaseUrl = process.env.BD_API;

/**
 * @returns Database response after performing the query
 * @param {Array} attributes
 * @param {string} from
 * @param {string} conditions
 */
const query = async (attributes, table, conditions) => {
  const queryString = buildQuery(attributes, table, conditions);
  console.log(queryString);
  const { data } = await axios.post(databaseUrl, queryString);

  if (typeof data === 'object' && 'error' in data) {
    return data;
  } else {
    return { error: null, data };
  }
};

module.exports = query;
