/**
 * @returns {String} select statment using attibutes, table and conditions
 * @param {Array} attributes
 * @param {string} from
 * @param {string} conditions
 */
const queryString = (attributes, from, conditions) => {
  attributes = attributes.join(', ');
  return 'select ' + attributes + ' from ' + from + ' ' + conditions + ';';
};

module.exports = queryString;
