'use client';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Control, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';

interface EditorTextProps {
    control: Control<any>;
    name: string;
    defaultValue?: string;
}

export const EditorText: React.FC<EditorTextProps> = ({ control, name, defaultValue = '' }) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
                <SimpleMDE
                    value={value}
                    onChange={onChange}
                />
            )}
        />
    );
};
