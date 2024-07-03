import Link from 'next/link';
import React from 'react';
interface Row {
    id: number | string;
    title: string;
}

interface Table {
    data: {
        head: string[];
        row: Row[];
    };
}
export const Table: React.FC<Table> = ({ data }) => {
    return (
        <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                    <tr>
                        {data.head.map((item) => {
                            return (
                                <th
                                    key={item}
                                    className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                >
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.row.map((post) => {
                        return (
                            <tr key={post.id}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4 text-left ">
                                    {post.title}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4 ">
                                    {post.id}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                    <Link href={'/admin/posts/edit/' + post.id}>Редактировать</Link>
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-m whitespace-nowrap p-4">
                                    Удалить
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
