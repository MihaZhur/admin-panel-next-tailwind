'use client';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/react';
import { useRef } from 'react';
interface Props {
    text?: string;
    onChange: (file: File) => void;
    file?: File | null | string;
}

export const ButtonUploader: React.FC<Props> = ({ text = 'Загрузить изображение', onChange, file }) => {
    const inputRef = useRef(null);
    const handleClick = () => {
        if (inputRef.current) {
            const inputEl = inputRef.current as HTMLInputElement;
            inputEl?.click();
        }
    };
    return (
        <div>
            <Button
                endContent={
                    <ArrowDownIcon
                        width={14}
                        height={14}
                    />
                }
                onClick={handleClick}
            >
                {file ? 'Изменить изображение' : text}
            </Button>
            <input
                type="file"
                className="hidden"
                ref={inputRef}
                onChange={(e) => {
                    if (e.target.files?.length) {
                        const file = e.target.files[0];
                        e.target.value = '';
                        return file && onChange(file);
                    }
                }}
            />
        </div>
    );
};
