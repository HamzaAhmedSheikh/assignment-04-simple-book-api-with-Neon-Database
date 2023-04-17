
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export const pgInstance = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE, 
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,  
  ssl: "allow",
});



export async function GET(request: NextRequest) {
  const users = await pgInstance.unsafe("SELECT * FROM books");  
  console.log("backend result", users);
  return new NextResponse(JSON.stringify(users));
}




