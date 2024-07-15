import { ReactNode } from 'react';

interface Props {
    link: ReactNode;
    title: string;
}
export const HeadPage: React.FC<Props> = ({ link, title }) => {
    return (
        <div className="flex flex-wrap items-center mb-4">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                {title && <h3 className="font-semibold text-3xl text-blueGray-700 dark:text-white">{title}</h3>}
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">{link}</div>
        </div>
    );
};
