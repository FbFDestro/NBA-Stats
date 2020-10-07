const axios = require('axios');
const databaseUrl = process.env.BD_API;

/**
 * @returns {String} select statment using attibutes, table and extraConditions
 * @param {Array} attributes
 * @param {string} target
 * @param {(string|null)} where
 * @param {(string|null)} extraConditions
 */
const buildQuery = (attributes, target, where = null, extraConditions = null) => {
  attributes = attributes.join(', ');
  const whereString = where !== null ? ' where ' + where : ' ';
  const extraConditionsString = extraConditions !== null ? extraConditions : '';
  return (
    'select ' + attributes + ' from ' + target + whereString + extraConditionsString + ';'
  );
};

/**
 * @returns Database response after performing the query
 * @param {Array} attributes
 * @param {string} target
 * @param {(string|null)} where
 * @param {(string|null)} extraConditions
 */
const query = async (attributes, target, where, extraConditions) => {
  const queryString = buildQuery(attributes, target, where, extraConditions);
  // database queries could aslo be done using node-postgres
  const { data } = await axios.post(databaseUrl, queryString);

  if (typeof data === 'object' && 'error' in data) {
    return data;
  } else {
    return { error: null, data };
  }
};

module.exports = query;
