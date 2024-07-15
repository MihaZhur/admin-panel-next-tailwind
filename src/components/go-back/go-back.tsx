'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

export const GoBack = () => {
    const router = useRouter();

    return (
        <Button
            color="primary"
            variant="light"
            size="sm"
            startContent={
                <ArrowLeftIcon
                    width={15}
                    height={15}
                />
            }
            onClick={() => router.back()}
            className="mb-4 mr-auto"
        >
            Вернуться назад
        </Button>
    );
};
