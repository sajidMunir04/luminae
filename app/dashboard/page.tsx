import Dashboard from '@/components/dashboard/Dashboard';
import { redirect } from 'next/navigation';
import { checkRole } from '../../utils/roles';

function dashboard()
{
    if (!checkRole("admin")) {
        redirect("/");
    }
    
    return (<>
        <Dashboard/>
    </>);   
}


export default dashboard;