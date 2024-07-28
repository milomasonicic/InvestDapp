import { useState, useEffect } from 'react';
import abi from "./contract/StocksToken2.json"
import { ethers, formatUnits } from "ethers";

export default function Balance({userId}){

    const [userBalance, setuserBalance] = useState()
    const formattedTokenShare = (parseFloat(userBalance) / Math.pow(10, 18)).toFixed(2);


    async function getUserBalanceInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const balance = await contract.getUserBalance(userId)
        console.log(balance, "balance comp")

        setuserBalance(balance)

        } catch(error){
            console.error("error", error)
        }
    }

    useEffect(()=>{
        getUserBalanceInfo()
    },[])


    return(
        <div className="text-xl py-6 
        font-extrabold 
        text-blue-500">
        
        Total Token Amount
        <div className="h-[30%] border-b-4 border-blue-500 "> {formattedTokenShare}SHW </div>
    </div>
    )
}