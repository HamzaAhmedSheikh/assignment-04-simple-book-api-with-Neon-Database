import postgres from "postgres";

export const pgInstance = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE, 
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,  
  ssl: "allow",
});