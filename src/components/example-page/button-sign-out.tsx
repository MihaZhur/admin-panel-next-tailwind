'use client';
import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

export const ButtonSignOut = () => {
    return (
        <Button
            onClick={() => signOut()}
            variant="bordered"
        >
            Выйти
        </Button>
    );
};
