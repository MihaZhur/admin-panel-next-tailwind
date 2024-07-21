'use client';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
interface Props {
    imagePath: string | null;
    onChange?: () => void;
    title?: string | null;
    onDelete?: () => void;
}

export const ImageUpload: React.FC<Props> = ({ imagePath, onChange, title, onDelete }) => {
    return (
        <div className="relative w-75 rounded-lg overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-14 px-4 transition-opacity opacity-0 group-hover:opacity-100 items-center justify-end flex gap-4">
                <Button
                    isIconOnly
                    color="primary"
                    size="sm"
                    onPress={onChange}
                    title="Изменить изображение"
                >
                    <ArrowUpTrayIcon
                        width={13}
                        height={13}
                    />
                </Button>
                <Button
                    isIconOnly
                    color="primary"
                    size="sm"
                    onPress={onDelete}
                    title="Удалить изображение"
                >
                    <TrashIcon
                        width={14}
                        height={14}
                    />
                </Button>
            </div>
            <Image
                src={imagePath ?? ''}
                alt={title || 'Preview'}
                width={300}
                height={300}
            />
        </div>
    );
};
