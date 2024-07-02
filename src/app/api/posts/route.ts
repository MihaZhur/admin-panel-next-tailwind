import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
interface Post {
  id: number;
  title: string;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

// To handle a POST request to /api
export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const body = await request.json();
    // console.log(body.data);
    const response = await axiosInstance.post('/posts', body);
    console.log(body, 'body');

    return NextResponse.json(
      { message: 'Новый пост создан!', response: response.data },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json({ err: err }, { status: 500 });
  }
}
// To handle a GET request to /api
export async function GET() {
  // Do whatever you want
  const responseBd = await axiosInstance.get('/posts');

  return NextResponse.json({ posts: responseBd.data }, { status: 200 });
}
