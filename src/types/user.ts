import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{
    select: {
        id: true;
        name: true;
        email: true;
        role: true;
        activated: true;
    };
}>;
