'use client';
import { Button, type ButtonProps } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
interface Props extends ButtonProps {}

export const SignOutButton: React.FC<Props> = ({ children = 'Выйти', ...restProps }) => {
    return (
        <Button
            onClick={() => signOut()}
            {...restProps}
        >
            {children}
        </Button>
    );
};
