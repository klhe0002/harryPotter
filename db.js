import "dotenv/config";
import { Pool, types } from "pg";

types.setTypeParser(1082, (value) => value);

export const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
