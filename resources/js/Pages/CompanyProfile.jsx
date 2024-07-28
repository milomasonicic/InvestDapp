import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import ProfileImageContainer from '@/Components/ProfileImageContainer';
import Deposit from './Deposit';
import Investitions from './Invenstitions'
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
                '>Company name: {company.name}</h2>

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
                <Investitions companyId={company.id} ></Investitions>
                </div>  
                <h2 className='text-center mt-10
                font-bold
                text-gray-900
                text-2xl
                dark:text-teal-400
                '>What we do? Company Description</h2>  
                    <p>
                        {dsc}
                    </p>
                </div>

                <div>
                <Ownerships number={company.id}></Ownerships>
                </div>
                
                <Deposit handleReload={handleReload} authUserId={auth.user.id} companyId={company.id} name={company.name} ></Deposit>
        </div>
    </AuthenticatedLayout>
    )
}

/*
   <img src="/uploads/11.jpg" alt="" />


*/