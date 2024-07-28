import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import ProfileImageContainer from '@/Components/ProfileImageContainer';
import Deposit from './Deposit';
import UserInvestment from './UserInvestAmount.jsx'

import CreateOffer from './CrateOffer';
import Ownerships from './OwnershipPercentage';


export default function CompanyProfile({founder, company, auth}){

    const[image, setImage] = useState()
    const [name, SetName] = useState()
    const[dsc, setDsc] = useState()

    const handleReload = () => {
        
        window.location.reload()
    };
    
    
    useEffect(() =>{
        setImage(company.file.name)
        setDsc(company.description)
        SetName(company.name)
        
    }, [image])
    return(
        <AuthenticatedLayout
        user={auth.user}
      
    > 
    
        <div> 
         
            <ProfileImageContainer image={image}></ProfileImageContainer>
        
                <h2 className='text-center mt-10
                font-bold
                text-gray-900
                text-2xl
                dark:text-teal-400
                '>Investmet: {company.name}</h2>

                <h2 className='text-center mt-10
                font-bold
                text-xl
                text-gray-900
                dark:text-teal-400
                '>Founder: {founder}</h2>

                <div className=' mt-14 w-[80%] 
                md:w-[60%] 
                mx-auto
                 text-gray-900
                dark:text-stone-50
                '>
                <div>
                <UserInvestment companyId={company.id} 
                userId={auth.user.id} ></UserInvestment>
                </div>  
                <h2 className='text-center mt-10
                font-bold
                text-gray-900
                text-2xl
                dark:text-teal-400
                '>This Company Description</h2>  
                    <p>
                        {dsc}
                    </p>
                </div>

                <div>
                
                </div>
                
                <CreateOffer></CreateOffer>
        </div>
    </AuthenticatedLayout>
    )
}

/*
   <img src="/uploads/11.jpg" alt="" />


*/