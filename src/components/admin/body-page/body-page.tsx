import React, { PropsWithChildren } from 'react';

export const BodyPage: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <section className="py-1 ">
            <div className="w-full mb-12 xl:mb-0  mx-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">{children}</div>
            </div>
        </section>
    );
};
