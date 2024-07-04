import prisma from '@/lib/db';
import { HttpServer } from '@/services/http-server.service';
import { NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
// To handle a GET request to /api
export async function GET(req: NextRequest) {
    const id = req.url.split('posts/')[1];

    // const postData = await HttpServer.get('/posts/' + id);

    const postData = await prisma.post.findUnique({
        where: {
            id: +id,
        },
    });

    return NextResponse.json({ ...postData }, { status: 200 });
}
export async function PATCH(req: NextRequest) {
    const id = req.url.split('posts/')[1];
    if (!id) {
        return NextResponse.json({ message: 'Ошибка 404' }, { status: 404 });
    }

    const response = await req.json();

    const postData = await prisma.post.update({
        where: {
            id: parseInt(id),
        },
        data: response,
    });

    return NextResponse.json({ ...postData }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    const id = req.url.split('posts/')[1];
    console.log(id);

    if (!id) {
        return NextResponse.json({ message: 'Ошибка 404' }, { status: 404 });
    }

    const postData = await prisma.post.delete({
        where: {
            id: parseInt(id),
        },
    });

    return NextResponse.json({ message: 'Пост успешно удален!' }, { status: 200 });
}
