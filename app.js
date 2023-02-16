const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const dbPath = path.join(__dirname, "todoApplication.db");
app.use(express.json());
let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error:${error}`);
    process.exit(1);
  }
};
initializeDbAndServer();
const convertDbObject = (objectItem) => {
  return {
    id: objectItem(id),
    todo: objectItem(todo),
    priority: objectItem(priority),
    status: objectItem(status),
  };
};

//Returns a list of all the players in the player table
// API 1

app.get("/players/", async (request, response) => {
  const getPlayerQuery = `select * from player_details;`;
  const getPlayerQueryResponse = await db.all(getPlayerQuery);
  response.send(
    getPlayerQueryResponse.map((eachPlayer) => convertDbObject(eachPlayer))
  );
});

module.exports = app;
