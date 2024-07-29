import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LandingPage from '@/Components/LandingPage';
import { Head } from '@inertiajs/react';
import Market from './Market';

export default function Dashboard({ auth }) {

    const authUser = auth.user.name
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

        
           
            <LandingPage user={authUser}></LandingPage>

            <Market></Market>
                
        </AuthenticatedLayout>
    );
}
