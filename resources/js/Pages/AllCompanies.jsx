import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function AllCompanies({auth, companies}){

    return(
        

        <AuthenticatedLayout
            user={auth.user}  
        >
            <h1 className='text-2xl
            text-gray-900
            dark:text-yellow-400
            text-center
            font-bold
            mt-24
            '>
                All Companies
            </h1>

            <div className='w-[75%]
            dark:text-teal-400
            md:w-[60%] mx-auto '>

            {
                companies.map((company, index) => (

                    <div key={index}>
                        <Link href={route('your.company', {id: company.id})}>
                        <h2>{company.name}</h2>
                        </Link>
                    </div>
                ))
            }
            </div>

        </AuthenticatedLayout>

    )
}