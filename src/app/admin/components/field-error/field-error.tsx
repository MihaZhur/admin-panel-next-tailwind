import React from 'react';
interface Props {
    error?: string;
}

export const FieldError: React.FC<Props> = ({ error }) => {
    return error && <span className="text-xs block mb-3 text-red">{error}</span>;
};
