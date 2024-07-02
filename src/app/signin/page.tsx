"use client";
import { signIn } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Login() {
    const router = useRouter();


    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res && !res.error) {
            router.push("/admin");
        } else {
            console.log(res);
        }
    };
    return <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-10">
            <div className="sm:mx-auto sm:w-full gap-3 flex justify-center items-center sm:max-w-sm">
                <Image
                    width={32}
                    height={32}
                    src={"/default/logo.png"}
                    alt="Logo"
                    priority
                />
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Авторизация</h2>
            </div>


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email адрес</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                </p> */}
            </div>
        </div>
    </>
}