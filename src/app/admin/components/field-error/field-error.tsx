import React from 'react';
interface Props {
    error?: string;
}

export const FieldError: React.FC<Props> = ({ error }) => {
    return error && <span className="text-xs text-red-400">{error}</span>;
};
