import { Pool } from "pg";

import {
  Kysely,
  PostgresDialect,
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
  sql,
} from "kysely";
import { NextApiRequest, NextApiResponse } from "next";

interface IBooks {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

interface Database {
  books: IBooks;
}


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


// async function getAllTheBooks() {
//   const res = await fetch("https://simple-books-api.glitch.me/books", {
//     method: "GET",
//     cache: "no-store",
//   });
 
//   const books = await res.json(); // Parse the API response
//   return books; // Return the parsed response
// }

// export async function GET(request: Request) {  
//     const db = new Kysely<Database>({
//         dialect: new PostgresDialect({
//           pool: new Pool({
//             ssl: true,
//             connectionString:
//               "postgres://hamzaahmedsheikh313:afLBpPjT2Il1@ep-super-darkness-886460.us-east-2.aws.neon.tech/neondb",
//           }),
//         }),
//       });

//   let books = await getAllTheBooks();     

//   for (const book of books) {
//     await db.insertInto("books").values({id: book.id, name: book.name, type: book.type, available: book.available}).execute();  
// }
 
//   return new Response("Data inserted into the database");
// }


