import Dashboard from '@/app/dashboard/Dashboard';
import { auth } from '@clerk/nextjs/dist/types/server';
import { redirect } from 'next/navigation';

function dashboard()
{
    return (<>
        <Dashboard/>
    </>);   
}

export default dashboard;