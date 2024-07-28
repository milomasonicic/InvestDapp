//getCompanyOwnership
import abi from "./contract/StocksToken2.json"
import { useState, useEffect } from "react"
import axios from "axios";
import { ethers, formatUnits } from "ethers";

export default function Ownerships({number}){

    const [ownershipInfo, setOwnershipInfo ] = useState([])

    //owner/Shares
    const [owners, setOwners] = useState([ ])
   // const [userNames, setUserNames] = useState({});

    //fetchuserName
   /* async function fetchUserName(userId) {

        try{
            const response = await axios.get(`http://founders.test/api/userName/${userId}`)
            return response.data.name
        } catch(error){
            console.error(error)
        }
    }*/
    
    const topOwners = [...owners].sort((a, b) => b.percentage - a.percentage).slice(0, 2);

    async function getOwnershipInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const numericCompanyId = Number(number);
       // console.log(numericCompanyId, "company Id")
        const ownerships = await contract.getCompanyOwnership(numericCompanyId)

        const formattedOwners = ownerships.map((proxyItem, index) => ({
            id: index + 1, // Assigning a unique identifier, such as an index
            userId: proxyItem[0], // Assuming the first property is shares
       
            percentage: proxyItem[1].toString() // Assuming the second property is percentage
        }));

        // Update state with the formatted ownership data
        setOwners(formattedOwners);

    } catch (error) {
        console.error("Error fetching ownership information:", error);
    }
 
    }

  

    useEffect(()=>{
        getOwnershipInfo()
    },[number])


    return(
        <div className="bg-red-300">
               <h2>OWN PERCENTAGE</h2>
               {owners.length > 0 ? (
                owners.map(owner => (
                    <div key={owner.id}>
                        <p>Ownership {owner.id}: userId: {owner.userId},
                            Percentage: {owner.percentage}%</p>
                    </div>
                ))
            ) : (
                <p>No ownership data available.</p>
            )}

            {topOwners.length > 0 ? (
                topOwners.map(owner => (
                    <div key={owner.id}>
                        <p>Ownership {owner.id}: userId: {owner.userId}
                            Percentage: {owner.percentage}%</p>
                    </div>
                ))
            ) : (
                <p>No ownership data available.</p>
            )}
        </div>
    )

}