import { pgInstance } from "../route";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  bookId?: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {

  console.log("params ==> ", params)  

  try {
    const { bookId } = params;
    // `SELECT *: This part of the query specifies which columns to retrieve from the table. In this case, * represents all columns, so it will retrieve all columns from the books table.
    // `WHERE id = ${bookId}: This part of the query specifies a condition that must be met for the data to be retrieved. In this case, it's checking if the value of the id column in the books table is equal to the value of the bookId variable.
    const query = `SELECT * FROM books WHERE id = ${bookId}`;

    const data = await pgInstance.unsafe(query);

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message || "Somethineg went wrong" },
      {
        status: 500,
      }
    );
  }
}
