import { Form, useActionData, useFetcher } from "@remix-run/react";
import { Logo } from "../_base/navigation";
import { json, type ActionFunctionArgs } from "@remix-run/server-runtime";
import { redirect_if_logged_in_loader } from "~/lib/auth.server";
type ActionData = {
    error: {
        auth_error?: string | null;
        username?: string | null;
        password?: string | null;
    };
};

export const loader = redirect_if_logged_in_loader;

export async function action({ request }: ActionFunctionArgs) {
    return json<ActionData>({
        p: "prop",
    });
}

export default function LoginRoute() {
    const actionData = useActionData<typeof action>();
    return (
        <div className=''>
            <div className='max-w-[400px] mx-auto px-[30px] mt-[150px]'>
                <div className='flex flex-col items-center gap-6'>
                    <Logo />
                    <h1 className='text-2xl'>Login to dashboard</h1>
                </div>
                {actionData?.error?.auth_error && (
                    <div className='mt-[30px] bg-red-100 text-red-950 border-red-400 border-2 rounded-xl px-[16px] py-[16px] text-sm'>
                        <p>{actionData.error.auth_error}</p>
                    </div>
                )}
                <Form
                    method='post'
                    className='mt-[30px] grid grid-cols-1 gap-[20px]'
                >
                    <div className='grid grid-cols-1 gap-[10px]'>
                        <label
                            htmlFor='username-input'
                            className='px-[6px]'
                        >
                            Username
                        </label>
                        <input
                            type='text'
                            name='username'
                            id='username-input'
                            minLength={3}
                            maxLength={20}
                            pattern='^[a-zA-Z0-9_]+$'
                            title='Username can only include letters, numbers, and underscores. And must be between 3 and 20 characters'
                            className='border border-black/50 rounded-md py-[6px] px-[6px]'
                            required
                        />
                        {actionData?.error?.username && (
                            <div className='mt-[30px] bg-red-100 text-red-950 border-red-400 border-2 rounded-xl px-[16px] py-[16px] text-sm'>
                                <p>{actionData.error.username}</p>
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-1 gap-[10px]'>
                        <label
                            htmlFor='password-input'
                            className='px-[6px]'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password-input'
                            className='border border-black/50 rounded-md py-[6px] px-[6px]'
                            minLength={8}
                            maxLength={100}
                            required
                        />
                        {actionData?.error?.password && (
                            <div className='mt-[30px] bg-red-100 text-red-950 border-red-400 border-2 rounded-xl px-[16px] py-[16px] text-sm'>
                                <p>{actionData.error.password}</p>
                            </div>
                        )}
                    </div>
                    <div className='pt-[10px]'>
                        <button
                            className='border border-black/50 rounded-md py-[6px] px-[6px] w-full'
                            disabled={fetcher.state != "idle"}
                        >
                            {fetcher.state != "idle" ? "Submitting" : "Submit"}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
