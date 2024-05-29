import Dashboard from '@/app/dashboard/Dashboard';
import { redirect } from 'next/navigation';
import { checkRole } from '../../utils/roles';
import { OrderFormData } from '@/app/cart/OrderFormData';
import Head from 'next/head';

function dashboard()
{
    if (!checkRole("admin")) {
        redirect("/");
    }
    
    return (<>
        <Head>
            <title>Admin Dashboard</title>
        </Head>
        <Dashboard/>
    </>);   
}


export default dashboard;