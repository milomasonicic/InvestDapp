import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import ProfileImageContainer from '@/Components/ProfileImageContainer';
import Deposit from './Deposit.jsx';
import UserInvestment from './UserInvestAmount.jsx'
import Investitions from './InvenstitionsProfile2.jsx'
import Percentage from './Percentage.jsx';
import CreateOffer from './CrateOffer.jsx';
import Ownerships from './OwnershipPercentage.jsx';
import { use } from 'chai';

import BuyTokens from './BuyStocks.jsx';



export default function Offer({offer, seller, company, auth}){

  
    return(
        <AuthenticatedLayout
        user={auth.user}
      
    > 
    
        <div className='w-[100%] md:w-[80%] mx-auto '> 
         
           
                <h2 className='text-left
                font-bold
                text-gray-900
                dark:text-teal-400
                '>Company Name: {company.name}</h2>

                <h2 className='text-left 
                font-bold
                text-gray-900
                dark:text-teal-400
                '>Amont Of Stocks: {offer.amount_of_stocks} </h2>

                <h2 className='text-left 
                font-bold
                text-gray-900
                dark:text-teal-400
                '>Seller: { seller.name} </h2>
       
            
        </div>

        <div>
            <BuyTokens></BuyTokens>
        </div>
    </AuthenticatedLayout>
    )
}

/*
   <img src="/uploads/11.jpg" alt="" />

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

 <ProfileImageContainer image={image}></ProfileImageContainer>
        
*/