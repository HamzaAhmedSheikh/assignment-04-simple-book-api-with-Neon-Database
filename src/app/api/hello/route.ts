
/******* Add books to Neon Database ********** */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { greeting: "hello world" },
    {
      status: 200,
    }
  );
}


