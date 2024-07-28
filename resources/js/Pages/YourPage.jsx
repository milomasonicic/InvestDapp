import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import abi from "./contract/StocksToken2.json"
import { ethers, formatUnits } from "ethers";
import History from './PersonalTransactions';
import Balance from './Balance';
import YourInvestmets from './InvestmentPerCompany';

export default function YourPage({auth}){

    const [balanceOf, setbalanceOf] = useState()
    const [toogle, setToogle] = useState(false)

    /*async function getYourContractInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const balance = await contract.balanceOf(auth.user.id)
        console.log(balance)

        setbalanceOf(balance)

        } catch(error){
            console.error("error", error)
        }
    }

    useEffect(()=>{
        getYourContractInfo()
    },[])
    */
    return(
        <AuthenticatedLayout
        user={auth.user}  
    >
        <h1 className='text-center text-xl py-24 
            font-extrabold 
            text-blue-500'>
            Hi {auth.user.name}
        </h1>
        <div className='w-[90%] md:w-[70%] mx-auto'>
            <Balance userId={auth.user.id}></Balance>
            <YourInvestmets userId={auth.user.id}></YourInvestmets>
        </div>
    </AuthenticatedLayout>
    )
}