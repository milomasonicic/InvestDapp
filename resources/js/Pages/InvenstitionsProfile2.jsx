import { useEffect, useState } from "react"
import abi from "./contract/StocksToken2.json"
import { ethers, formatUnits } from "ethers";

export default function Investitions({companyId, functionBalance}){

    const[companyBalance, setCompanyBalance] = useState()
   

    async function getContractInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const balance = await contract.getCompanyTotalBalance(companyId)
        console.log(balance)
        const formattedTokenShare = (parseFloat(balance) / Math.pow(10, 18)).toFixed(2);    
        setCompanyBalance(formattedTokenShare)
        functionBalance(formattedTokenShare)

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
            text-blue-900">
            
            CompanyTotal
            <div className="h-[30%] border-b-4 border-blue-900 "> {companyBalance}SHW </div>
        </div>
    )

}