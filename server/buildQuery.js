/**
 * @returns {String} select statment using attibutes, table and extraConditions
 * @param {Array} attributes
 * @param {string} target
 * @param {(string|null)} where
 * @param {(string|null)} extraConditions
 */
const queryString = (attributes, target, where, extraConditions) => {
  attributes = attributes.join(', ');
  const whereString = where !== null ? ' where ' + where : ' ';
  const extraConditionsString = extraConditions !== null ? extraConditions : '';
  return (
    'select ' + attributes + ' from ' + target + whereString + extraConditionsString + ';'
  );
};

module.exports = queryString;
