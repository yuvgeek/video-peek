const { client } = require("../harperdb-connection");

const handler = async (req) => {
  try {
    const params = req.queryStringParameters;
    const options =
      "SELECT * FROM peek.meetings WHERE event_id='" + params.meetingId + "'";

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
