const query = require('../databaseQuery');

const getTeams = async (request, response) => {
  const data = await query('select * from teams limit 2');
  console.log(data);
  return response.status(200).json('god');
};

module.exports = {
  getTeams,
};
