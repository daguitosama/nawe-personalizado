import { Link, Outlet } from "@remix-run/react";

export default function AdminLayout() {
    return (
        <div>
            <Navigation />
            <main className='px-8'>
                <Outlet />
            </main>
        </div>
    );
}

function Navigation() {
    return (
        <div className='p-8 flex items-center sticky top-0 left-0 w-full bg-white'>
            <div className='max-w-screen-xl flex items-center gap-6'>
                <p className='font-medium '>Nawe Dashboard</p>
                <ul className='flex items-center gap-2'>
                    <li>
                        <Link to='/admin/'>Ordenes</Link>
                    </li>
                    <li>
                        <Link to='/admin/customers'>Clientes</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
