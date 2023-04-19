import { pgInstance } from "@/db/db_instance";
// This imports the verify function from the "jsonwebtoken" library, which is used to verify JSON Web Tokens (JWTs).
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    // This calls the verify function from the "jsonwebtoken" library to verify the token against a secret key stored in
    //  the ACCESS_TOKEN_SECRET environment variable. The returned result is cast to a Record<string, string> type, 
    // which represents an object with string keys and string values.

    const parsedToken = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as Record<string, string>;

    const query = `SELECT * from register_user WHERE client_email = '${parsedToken.client_email}'`;

    const extracted_user = await pgInstance.unsafe(query);

    return NextResponse.json(extracted_user[0]);
  } catch (error) {
    console.log(error);
    throw new Error("You are not permitted");
  }
}
