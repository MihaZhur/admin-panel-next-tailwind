import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await hash('1q2w3e4r', 8);
    const user = await prisma.user.create({
        data: {
            email: 'user@test.ru',
            name: 'Test test',
            password,
            role: 'USER',
        },
    });
    console.log({ user });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
