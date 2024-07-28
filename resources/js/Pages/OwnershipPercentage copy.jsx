//getCompanyOwnership
import abi from "./contract/StocksToken2.json"
import { useState, useEffect } from "react"
import axios from "axios";
import { ethers, formatUnits } from "ethers";

export default function Ownerships({number}){

    const [ownershipInfo, setOwnershipInfo ] = useState([])

    //owner/Shares
    const [owners, setOwners] = useState([ ])

    //fetchuserName
    async function fetchUserName(userId) {

        try{
            const response = await axios.get(`http://founders.test/api/userName/${userId}`)
            return response.data.name
        } catch(error){
            console.error(error)
        }
    }
    

   console.log(ownershipInfo, "info")
    async function getOwnershipInfo(){

        try{

        const provider = new ethers.JsonRpcProvider('http://localhost:8545')
        const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        const contractABI = abi.abi

        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const numericCompanyId = Number(number);
       // console.log(numericCompanyId, "company Id")
        const ownerships = await contract.getCompanyOwnership(numericCompanyId)

        const formattedOwners = await Promise.all(
            ownerships.map(async (proxyItem, index) => {
                const userId = proxyItem[0].toString();
                const percentage = proxyItem[1].toString();

                // Fetch the user's name based on userId
                const userName = await fetchUserName(userId);
                console.log(userName, "userNmae")
                return {
                    id: index + 1,
                    userId,
                    userName,
                    percentage
                };
            })
        );
        // Update state with the formatted ownership data
        setOwners(formattedOwners);

    } catch (error) {
        console.error("Error fetching ownership information:", error);
    }
 
    }

  

    useEffect(()=>{
        getOwnershipInfo()
    },[number])

   /* useEffect(()=>{
        processOwnershipInfo()
    },[ownershipInfo])
*/
    return(
        <div className="bg-red-300">
               <h2>OWN PERCENTAGE</h2>
               {owners.length > 0 ? (
                owners.map(owner => (
                    <div key={owner.id}>
                        <p>Ownership {owner.id}: userId: {owner.userId}, userName: {owner.userName}, Percentage: {owner.percentage}%</p>
                    </div>
                ))
            ) : (
                <p>No ownership data available.</p>
            )}
        </div>
    )

}