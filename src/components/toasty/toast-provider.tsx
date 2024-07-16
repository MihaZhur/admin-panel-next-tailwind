'use client';
import 'react-toastify/dist/ReactToastify.css';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const contextClass = {
        success: 'bg-success', // #219653
        error: 'bg-danger', // #D34053
        info: 'bg-primary', // #3C50E0
        warning: 'bg-warning', // #FFA70B
        default: 'bg-secondary', // #80CAEE
        dark: 'bg-black text-white', // #1C2434
    };

    return (
        <>
            {children}
            <ToastContainer
                toastClassName={(context) =>
                    contextClass[context?.type || 'default'] +
                    ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
                }
                bodyClassName={() => 'text-sm font-white font-med block p-3 flex items-center'}
                position="bottom-center"
                autoClose={3000}
            />
        </>
    );
};
