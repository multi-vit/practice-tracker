import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString);
const db = client.db("practicedb");
const practices = db.collection("practices");

export default practices;
