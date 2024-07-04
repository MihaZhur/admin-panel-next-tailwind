import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await hash('1q2w3e4r', 8);
    const user = await prisma.user.upsert({
        where: { email: 'admin@email.ru' },
        update: {
            password,
        },
        create: {
            email: 'admin@test.ru',
            name: 'Admin Adminov',
            password,
            role: 'ADMIN',
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
