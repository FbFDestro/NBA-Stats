const axios = require('axios');
const buildQuery = require('./buildQuery');
const databaseUrl = process.env.BD_API;

/**
 * @returns Database response after performing the query
 * @param {Array} attributes
 * @param {string} target
 * @param {(string|null)} where
 * @param {(string|null)} extraConditions
 */
const query = async (attributes, target, where, extraConditions) => {
  const queryString = buildQuery(attributes, target, where, extraConditions);
  console.log(queryString);
  const { data } = await axios.post(databaseUrl, queryString);

  if (typeof data === 'object' && 'error' in data) {
    return data;
  } else {
    return { error: null, data };
  }
};

module.exports = query;
