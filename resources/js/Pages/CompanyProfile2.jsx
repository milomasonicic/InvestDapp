import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import ProfileImageContainer from '@/Components/ProfileImageContainer';
import Deposit from './Deposit';
import UserInvestment from './UserInvestAmount.jsx'
import Investitions from './InvenstitionsProfile2'
import Percentage from './Percentage';
import CreateOffer from './CrateOffer';
import Ownerships from './OwnershipPercentage';
import { use } from 'chai';


export default function CompanyProfile({founder, company, auth}){

    const[image, setImage] = useState()
    const [name, SetName] = useState()
    const[dsc, setDsc] = useState()

    //userBalance
    const [blnc1, setBlnc] = useState()
    //company Balance
    const [blnc2, setBlc] = useState()

    const handleBalance = (blnc) => {
        
       setBlnc(blnc)
    };

    const handleCompanyBlnc = (balance) => {
        
        setBlc(balance)
     };

    //
    console.log(blnc1, "you")
    console.log(blnc2, "company")
    
    
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
                balanceUpdate={handleBalance} 
                userId={auth.user.id} ></UserInvestment>
                 <Investitions companyId={company.id}  
                functionBalance={handleCompanyBlnc}></Investitions>
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

                <div className='w-full h-[300px] dark:bg-gray-700 bg-stone-100'>
                     
                     
                    <Percentage userBalance={blnc1} 
                    companyBalance={blnc2}></Percentage>

                </div>
               
                
                <CreateOffer controlBalance={blnc1} 
                company_id={company.id} user_id={auth.user.id}></CreateOffer>
        </div>
    </AuthenticatedLayout>
    )
}

/*
   <img src="/uploads/11.jpg" alt="" />


*/