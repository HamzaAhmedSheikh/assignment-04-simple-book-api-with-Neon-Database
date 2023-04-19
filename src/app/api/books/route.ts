import { NextRequest, NextResponse } from "next/server";
import { pgInstance } from "@/db/db_instance";


export async function GET(request: NextRequest) {
  const users = await pgInstance.unsafe("SELECT * FROM books");  
  
  return new NextResponse(JSON.stringify(users));
}




