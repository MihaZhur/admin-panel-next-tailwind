import { HttpServer } from '@/services/http-server.service';
import { NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
// To handle a GET request to /api
export async function GET(req: NextRequest) {
  const id = req.url.split("posts/")[1];;

  const postData = await HttpServer.get('/posts/' + id);

  return NextResponse.json({ ...postData.data }, { status: 200 });
}
export async function PATCH(req: NextRequest) {
  const id = req.url.split("posts/")[1];

  const response = await req.json();

  const postData = await HttpServer.patch('/posts/' + id, response);

  return NextResponse.json({ ...postData.data }, { status: 200 });
}
