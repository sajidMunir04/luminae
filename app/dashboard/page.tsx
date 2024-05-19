import Dashboard from '@/app/dashboard/Dashboard';
import { redirect } from 'next/navigation';
import { checkRole } from '../../utils/roles';
import { OrderFormData } from '@/app/cart/OrderFormData';

function dashboard()
{
    if (!checkRole("admin")) {
        redirect("/");
    }
    
    return (<>
        <Dashboard orders={[]}/>
    </>);   
}


export default dashboard;