const { client } = require("../harperdb-connection");

const handler = async (req) => {
  try {
    const params = req.queryStringParameters;
    let options =
      "select event.*, category.name as skillName from peek.events as event" +
      " INNER JOIN peek.categories AS category ON event.skill = category.id";

    if (params.category !== "all") {
      options += " WHERE event.skill='" + params.category + "'";
    }
    options += " ORDER BY event.date ASC";
    
    console.log(options);
    const res = await client.query(options);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (error) {
    console.log(error);

    return { statusCode: 500, body: error.toString() };
  }
};
module.exports = { handler };
