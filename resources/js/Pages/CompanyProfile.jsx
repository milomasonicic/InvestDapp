import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import ProfileImageContainer from '@/Components/ProfileImageContainer';

export default function CompanyProfile({founder, company, auth}){

    const[image, setImage] = useState()
    const[dsc, setDsc] = useState()
    
    
    useEffect(() =>{
        setImage(company.file.name)
        setDsc(company.description)
        
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
                    <p>
                        {dsc}
                    </p>
                </div>
                
                
        </div>
    </AuthenticatedLayout>
    )
}

/*
   <img src="/uploads/11.jpg" alt="" />


*/