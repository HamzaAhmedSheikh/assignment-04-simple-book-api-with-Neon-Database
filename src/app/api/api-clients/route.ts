import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pgInstance } from "../books/route";

interface IBody {
  clientName: string;
  clientEmail: string;
};


// API Authentication
// To submit or view an order, you need to register your API client.

export async function POST(request: NextRequest) {
  try {

    // This line of code is using destructuring assignment and type assertion to extract data from the request object and assign 
    // it to clientName and clientEmail variables.    
    const { clientName, clientEmail } = (await request.json()) as IBody;

    if (!clientName || !clientEmail) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 401,
        }
      );
    }

    const query = `INSERT INTO register_user (client_name, client_email) VALUES ('${clientName}', '${clientEmail}')`;
    await pgInstance.unsafe(query);

    /************************
     A JWT access token is generated using jwt.sign() function, which takes a payload (in this case, an object containing client_email property),
     a secret key for signing the token (retrieved from process.env.ACCESS_TOKEN_SECRET environment variable),
     and an options object that specifies the expiration time for the token (7 days in this case).
    ***************************/

    const accessToken = jwt.sign(
      {
        client_email: clientEmail,
      },
      
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "7d" }
    );   

    return NextResponse.json(
      { accessToken },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: "API client already registered." },
      {
        status: 409,
      }
    );
  }
}