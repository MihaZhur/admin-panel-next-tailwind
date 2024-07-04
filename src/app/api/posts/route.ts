import prisma from '@/lib/db';
import { HttpServer } from '@/services/http-server.service';
import { NextResponse, NextRequest } from 'next/server';
interface Post {
    id: number;
    title: string;
}

// To handle a POST request to /api
export async function POST(request: NextRequest, res: NextResponse) {
    try {
        const body = await request.json();
        // console.log(body.data);
        const response = await prisma.post.create({ data: { ...body, authorId: 1 } });

        return NextResponse.json({ message: 'Новый пост создан!', response: response }, { status: 201 });
    } catch (err) {
        console.log(err);

        return NextResponse.json({ err: err }, { status: 500 });
    }
}
const LIMIT_ITEM_PAGE = 10;
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '') || 1; // Получаем параметр page из запроса, по умолчанию 1
    const skip = (page - 1) * LIMIT_ITEM_PAGE;
    const posts = await prisma.post.findMany({
        skip: skip,
        take: LIMIT_ITEM_PAGE,
    });

    const total = await prisma.post.count();

    const totalPages = Math.ceil(total / LIMIT_ITEM_PAGE);

    return NextResponse.json({ posts, total, totalPages }, { status: 200 });
}
