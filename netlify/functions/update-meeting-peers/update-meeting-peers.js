const { client } = require("../harperdb-connection");

const handler = async (req) => {
  try {
    const body = JSON.parse(req.body);
    const options = {
      table: "meetings",
      records: [
        {
          user_id: body.userId,
          event_id: body.meetingId,
          peer_id: body.peerId,
        },
      ],
    };
    const res = await client.insert(options);
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
