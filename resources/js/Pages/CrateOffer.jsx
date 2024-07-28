import { router } from "@inertiajs/react"
import { useForm } from '@inertiajs/react'
import { Wallet } from "ethers";
import { useState } from 'react';


export default function CreateOffer({company_id, user_id, controlBalance})
{

    const MAX_AMOUNTOFTOKEN = Number(controlBalance) 

    const { data, setData, put, processing, errors } = useForm({
        seller_id: user_id,
        company_id: company_id,
        amountStocks: ' ', 
        seller_walletAdress: ' '
      })

      function submit(e) {
        e.preventDefault()
        router.post("/offerStore", data)
    }

      const handleAmountStocks = (e) => {

        if(e.target.value < MAX_AMOUNTOFTOKEN){

            setData('amountStocks', e.target.value)
        }else{
            alert("You can not sell more than you have")
        }
        
      };  

      const handleSellerWalletAdress = (e) => {
        
        setData('seller_walletAdress', e.target.value)
      };  


    return(
        <div className="text-red-300 bg-red-300">
            Offer Offer Offer Create Offer

            <div className="py-20 px-5 mx-auto 
            flex flex-col md:flex-row 
            items-center md:justify-center gap-4">

        <form onSubmit={submit} className="flex flex-col md:flex-row gap-4">
        
        
        <input type="number"
         placeholder="Enter amount of tokens"
         class="bg-gray-50  border border-gray-300 
         text-gray-900 text-sm rounded-lg 
         focus:ring-blue-500 focus:border-blue-500 
         block h-[55px] w-[225px] md:w-[240px] p-2.5 
         dark:bg-gray-700 dark:border-gray-600 
         dark:placeholder-gray-400 dark:text-white 
         dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={handleAmountStocks}
         value={data.amountStocks}
         />      

          <input type="text"
         placeholder="Add your wallet"
         class="bg-gray-50  border border-gray-300 
         text-gray-900 text-sm rounded-lg 
         focus:ring-blue-500 focus:border-blue-500 
         block h-[55px] w-[225px] md:w-[240px] p-2.5 
         dark:bg-gray-700 dark:border-gray-600 
         dark:placeholder-gray-400 dark:text-white 
         dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={handleSellerWalletAdress}
         value={data.seller_walletAdress}
        />      


        <button 
            class="text-white                            
            bg-teal-400
            dark:bg-violet-400
            h-[50px] focus:ring-4 
            focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
            font-medium rounded-lg text-sm px-5 py-4 text-center 
            me-2 mb-2 w-[210px] md:w-[240px] mt-4 md:mt-0 "
            > Deposit                
         </button> 
        </form>        


        </div>
        </div>
    )
}