'use client';
import React, { useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Control, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';

interface EditorTextProps {
    control: Control<any>;
    name: string;
    defaultValue?: string;
}

export const EditorText: React.FC<EditorTextProps> = ({ control, name, defaultValue = '' }) => {
    const autofocusNoSpellcheckerOptions: EasyMDE.Options = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        };
    }, []);
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => {
                return (
                    <SimpleMDE
                        options={autofocusNoSpellcheckerOptions}
                        value={value}
                        onChange={onChange}
                        className="dark:bg-slate-700 w-full"
                        textareaProps={{
                            className: 'dark:bg-slate-700',
                        }}
                    />
                );
            }}
        />
    );
};
