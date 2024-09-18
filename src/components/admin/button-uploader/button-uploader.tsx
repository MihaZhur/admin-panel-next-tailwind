'use client';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageUpload } from '../image-upload';
interface Props {
    text?: string;
    onChange: (file: File | null) => void;
    file?: File | null | string;
    imagePath?: string | null;
    onImageDelete?: () => void;
}

export const ButtonUploader: React.FC<Props> = ({
    text = 'Загрузить изображение',
    onChange,
    imagePath,
    onImageDelete,
}) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            return file && onChange(file);
        },
        [onChange],
    );
    const handleClickDeleteImage = () => {
        onChange(null);
        onImageDelete?.();
    };
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop });

    return (
        <>
            {!imagePath ? (
                <div
                    className="flex items-center justify-center w-75"
                    {...getRootProps()}
                >
                    <div
                        className={`flex flex-col items-center justify-center w-full h-75 border-2 ${isDragActive ? 'border-green-500' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ArrowUpTrayIcon
                                width={30}
                                height={30}
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            {...getInputProps()}
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                        />
                    </div>
                </div>
            ) : (
                <ImageUpload
                    title={text}
                    imagePath={imagePath}
                    onDelete={handleClickDeleteImage}
                    onChange={open}
                />
            )}
        </>
    );
};
