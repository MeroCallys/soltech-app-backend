import express from "express";
import cors from "cors";
import pg from "pg";
// import { postgres } from "./database/db";

const postgres = {
  user: "postgres",
  host: "localhost",
  database: "system",
  password: "5oltech",
  port: 5432,
};

const client = new pg.Client(postgres);
client.on("error", (err) => {
  console.error("something bad has happened!", err.stack);
});

const app = express();
const port = 3000;

client.connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/profiles", async (req, res) => {
  const result = await client.query("SELECT * FROM profiles");
  res.json(result.rows);
  console.log(result.rows);
});
app.get("/profiles/:id", async (req, res) => {
  const input = req.params.id;
  const result = await client.query(
    `SELECT * FROM profiles WHERE id = ${input}`
  );
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
