import { NextRequest, NextResponse } from "next/server";
import { pgInstance } from "../books/route";


type Body = {
  bookId?: string;
  customerName?: string;
};

// submit a new order
export async function POST(request: NextRequest, response: NextResponse) {
    console.log("request ==> ", request.headers)
  try {
    const { bookId, customerName } = (await request.json()) as Body;
    const userId = JSON.parse(request.headers.get("userId")!);

    if (!bookId || !customerName) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 403,
        }
      );
    }

    const query = `INSERT INTO books_order (createdby, bookId, customer_name, quantity) VALUES (${userId}, ${bookId}, '${customerName}', 1) returning *`;

    const response = await pgInstance.unsafe(query);

    return NextResponse.json(response, {
      status: 201,
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



// get all orders
export async function GET(request: NextRequest) {
  try {
    const userId = JSON.parse(request.headers.get("userId")!);
    const query = `SELECT * FROM books_order WHERE createdBy = ${userId}`;

    const response = await pgInstance.unsafe(query);

    return NextResponse.json(response, {
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
