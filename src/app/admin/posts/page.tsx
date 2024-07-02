import Link from "next/link"

export default async function Posts() {
    const staticData = await fetch(`http://localhost:3000/api/posts/`, { cache: 'no-store' })

    const { posts } = await staticData.json()
    // console.log(posts);


    return (
        <>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-lg text-blueGray-700">Статьи</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link href={'/admin/posts/create'} className="bg-indigo-500 text-white active:bg-indigo-600 text-s font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Создать пост</Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Название статьи
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            id
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {/* Unique users */}
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-base  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {/* Bounce rate */}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {posts.map((post: any) => {
                                        return <tr key={post.id}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {post.title}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                4,569
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <Link href={'/admin/posts/create/' + post.id}>Редактировать</Link>
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                Удалить
                                            </td>
                                            
                                        </tr>


                                    })}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
