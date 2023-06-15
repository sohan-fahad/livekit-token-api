const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { AccessToken } = require("livekit-server-sdk");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// add food api
async function run() {
  try {
    app.post("/get-token", async (req, res) => {
      const { roomName, participantName } = req.body;

      const at = new AccessToken(
        "API2axhtoc6oUxm",
        "SVVLMwejKKlqmgf9LV255fWOmEeLLEYM41O1Ma1rIZ6B",
        {
          identity: participantName,
        }
      );
      at.addGrant({ roomJoin: true, room: roomName });

      const token = at.toJwt();
      const payloa = {
        statusCode: 200,
        payload: { token },
        success: true,
        message: "Success",
      };
      res.send(payloa);
    });
  } finally {
  }
}
run().catch();

app.listen(port, () => {
  console.log(port);
});
