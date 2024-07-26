import { useState, useEffect } from 'react';
import abi from "./contract/Stocks1.json"
import { ethers, formatUnits } from "ethers";

export default function YourInvestmets({userId}){

    const [userBalance, setuserBalance] = useState()
    const formattedTokenShare = (parseFloat(userBalance) / Math.pow(10, 18)).toFixed(2);


    async function getInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
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
        
        
    </div>
    )
}