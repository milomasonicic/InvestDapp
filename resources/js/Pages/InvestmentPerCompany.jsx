import { useState, useEffect } from 'react';
import abi from "./contract/StocksToken2.json"
import axios from 'axios';
import { ethers, formatUnits } from "ethers";
import { Link } from '@inertiajs/react';

export default function YourInvestmets({userId}){

   const [companies, setCompanies] = useState([])
    //const formattedTokenShare = (parseFloat(userBalance) / Math.pow(10, 18)).toFixed(2);
    console.log(userId)
   

    async function getInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const companies = await contract.getUserInvestedCompanies(4);
        console.log(companies, "invePet cmp");
    
        const formattedOwners = companies.map((proxyItem, index) => ({
            id: index + 1, // Assigning a unique identifier, such as an index
            companyId: proxyItem[0], // Assuming the first property is shares

            companyName: proxyItem[1].toString() // Assuming the second property is percentage
        }));

        // Update state with the formatted ownership data
        setCompanies(formattedOwners);

        } catch(error){
            console.error("error", error)
        }
    }

    useEffect(()=>{
        getInfo()
    },[])


    return(
        <div className="text-xl py-6 
        font-extrabold 
        text-blue-500">

        <ul>
        {companies.length > 0 ? (
                companies.map(company => (
                    <div key={company.id}>
                        <div>
                            {company.companyId}

                        </div>
                        <Link href={`/companyprof/${company.companyId}`} 
                        class="text-blue-700 underline"
                        >
                            <strong>
                            {company.companyName}
                            </strong>
                        </Link>
                        
                    </div>
                ))
            ) : (
                <p>You did not invest.</p>
            )}
            </ul>
        
    </div>
    )
}