import { useEffect, useState } from "react"
import abi from "./contract/Stocks1.json"
import { ethers, formatUnits } from "ethers";

export default function Investitions({companyId}){

    const[companyBalance, setCompanyBalance] = useState()
    const formattedTokenShare = (parseFloat(companyBalance) / Math.pow(10, 18)).toFixed(2);

    async function getContractInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const balance = await contract.getCompanyTotalBalance(companyId)
        console.log(balance)

        setCompanyBalance(balance)

        } catch(error){
            console.error("error", error)
        }
    }

    useEffect(()=>{
        getContractInfo()
    },[])

    return(
        <div className="text-xl py-6 
            font-extrabold 
            text-blue-500">
            
            Investitions
            <div className="h-[30%] border-b-4 border-blue-500 "> {formattedTokenShare}SHW </div>
        </div>
    )

}