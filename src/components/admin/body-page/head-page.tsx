import { PlusIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    link?: string;
    title?: string;
    linkTitle?: string;
}
export const HeadPage: React.FC<Props> = ({ link, title, linkTitle = 'Создать' }) => {
    return (
        <div className="flex flex-wrap items-center mb-4">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                {title && <h3 className="font-semibold text-3xl text-blueGray-700 dark:text-white">{title}</h3>}
            </div>
            {link && (
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Button
                        href={link}
                        as={Link}
                        endContent={<PlusIcon className=" w-5" />}
                        color="primary"
                        size="sm"
                    >
                        {linkTitle}
                    </Button>
                </div>
            )}
        </div>
    );
};
