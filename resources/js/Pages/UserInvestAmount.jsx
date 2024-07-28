import { useEffect, useState } from "react"
import abi from "./contract/StocksToken2.json"
import { ethers, formatUnits } from "ethers";

export default function UserInvestment({companyId, userId}){

    const[blnc, setBlnc] = useState()
    const formattedTokenShare = (parseFloat(blnc) / Math.pow(10, 18)).toFixed(2);

    async function getContractInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const userIdCompanyBlnc = await contract.getUserTokenBalance(userId,companyId)
        console.log(userIdCompanyBlnc, "money invested into compnay")

        setBlnc(userIdCompanyBlnc)

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