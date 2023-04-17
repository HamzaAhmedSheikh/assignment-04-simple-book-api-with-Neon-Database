
/******* Add books to Neon Database ********** */


// async function getAllTheBooks() {
//   const res = await fetch("https://simple-books-api.glitch.me/books", {
//     method: "GET",
//     cache: "no-store",
//   });

//   const books = await res.json(); // Parse the API response
//   return books; // Return the parsed response
// }

/*********
 * export async function GET(request: Request) {  
    const db = new Kysely<Database>({
        dialect: new PostgresDialect({
          pool: new Pool({
            ssl: true,
            connectionString:
              "postgres://hamzaahmedsheikh313:afLBpPjT2Il1@ep-super-darkness-886460.us-east-2.aws.neon.tech/neondb",
          }),
        }),
      });

    let books = await getAllTheBooks();     
  
    // Loop through each book and insert into the database
    for (const book of books) {
        await db.insertInto("books").values({id: book.id, name: book.name, type: book.type, available: book.available}).execute();  
    }
  
    return new Response("Data inserted into the database"); // Return a response indicating successful insertion
}

 * ***/


import { NextRequest, NextResponse } from "next/server";

import { Pool } from 'pg';

import {
  Kysely,
  PostgresDialect,
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from 'kysely';
import postgres from "postgres";


interface playing_with_neon_Table {
  id: Generated<number>
  name: string
  value: number
}

interface IBooks {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

interface Database {
  // playing_with_neon: playing_with_neon_Table
  books: IBooks
}

const pgInstance = postgres({
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
  // const db = new Kysely<Database>({
  //   dialect: new PostgresDialect({
  //     pool: new Pool({
  //       ssl: true,
  //       connectionString: "postgres://hamzaahmedsheikh313:afLBpPjT2Il1@ep-super-darkness-886460.us-east-2.aws.neon.tech/neondb"
  //     })
  //   })
  // });
  
  // const result = await db
  // .selectFrom("books")
  // .selectAll()
  // .execute()
  
  // console.log("backend result", result);
  // return new NextResponse(JSON.stringify(result));
}


// export async function POST(request: NextRequest) {
//   const db = new Kysely<Database>({
//     dialect: new PostgresDialect({
//       pool: new Pool({
//         ssl: true,
//         connectionString: "postgres://hamzaahmedsheikh313:afLBpPjT2Il1@ep-super-darkness-886460.us-east-2.aws.neon.tech/neondb"
//       })
//     })
//   });
  
//   try {      
//     const result = await db.insertInto('playing_with_neon')
//       .values({
//         id: 13, // Provide the appropriate value for the 'id' column
//         name: 'Ahmed', // Provide the appropriate value for the 'name' column
//         value: 0.22224 // Provide the appropriate value for the 'value' column
//       }).execute();   
//     return new NextResponse(JSON.stringify(result));
//   } catch (error) {
//     console.error(error);
//     return new NextResponse('Error inserting data', { status: 500 });
//   }
// }

