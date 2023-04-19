import { pgInstance } from "@/db/db_instance";

import { NextRequest, NextResponse } from "next/server";

type Params = {
  orderId: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {

  /******* WHERE id = ${orderId} AND createdBy = ${userId}: This specifies two conditions for filtering the rows to be retrieved. 
   *       The first condition id = ${orderId} specifies that the rows to be retrieved must have a value in the id column that matches the value of the
   *       orderId parameter. The second condition createdBy = ${userId} specifies that the rows to be retrieved must have a value in the createdBy column 
   *       that matches the value of the userId parameter. ${orderId} and ${userId} are placeholders that likely need to be replaced with actual values when 
   *       executing the query.
   * ************** */
  

  try {
    const { orderId } = params;
    const userId = JSON.parse(request.headers.get("userId")!);

    const query = `SELECT * from books_order WHERE id = ${orderId} AND createdBy = ${userId}`;
    const response = await pgInstance.unsafe(query);

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error: any) {
    // console.log(error);

    return NextResponse.json(
      { error: error.message || "Somethineg went wrong" },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { orderId } = params;
    const { customerName } = await request.json();
    const userId = JSON.parse(request.headers.get("userId")!);

    if (!customerName) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 401,
        }
      );
    }

    /****** SET customer_name = '${customerName}': This sets the value of the customer_name column to the value of the customerName parameter. ******/

    /****** WHERE id = ${orderId} AND createdBy = ${userId}: This specifies two conditions for updating the rows in the books_order table. ******/

    /**** RETURNING *: This is a PostgreSQL-specific clause that returns the updated rows after the update operation is completed. *****/

    const query = `
    UPDATE books_order
    SET customer_name = '${customerName}'
    WHERE id = ${orderId}
    AND createdBy = ${userId}
    returning *
    ;
    `;

    const data = await pgInstance.unsafe(query);

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error: any) {
    // console.log(error);

    return NextResponse.json(
      { error: error.message || "Somethineg went wrong" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { orderId } = params;
    const userId = JSON.parse(request.headers.get("userId")!);

    const query = `DELETE from books_order WHERE id = ${orderId} AND createdBy = ${userId}`;

    await pgInstance.unsafe(query);

    return NextResponse.json(
      { message: "deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // console.log(error);

    return NextResponse.json(
      { error: error.message || "Somethineg went wrong" },
      {
        status: 500,
      }
    );
  }
}
