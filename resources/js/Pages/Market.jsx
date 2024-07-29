import axios from "axios"
import { useEffect, useState } from "react"
import Transaction from "./Transactions"

export default function Market(){

    const [offers, setOffers] = useState([])

    const getOffers = async () => {

        try{

            const response = await axios.get('http://founders.test/api/offers')
            console.log(response.data, "offers")
            setOffers(response.data)

        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        getOffers()
    }, [])


    return(
        <div className="w-[80%] mx-auto
        
        h-[400px]">

            <h2 className='text-2xl 
            text-gray-900
            dark:text-yellow-400' >MARKET</h2>
            {console.log(offers, "state")}

            {offers.length > 0 ? (

                offers.map((offer, id) => ( 
                    <Transaction
                        key={id}
                        amount={offer.amount_of_stocks} 
                        name={offer.company.name} 
                        time={222}></Transaction>
                    ))
              

            ) : (
                <p> No Offers</p>
            )}
            
            
        </div>
    )
}

/*
            {offers.length > 0 ? (
                   offers.map((offer, id) =>( 
                
                    <Transaction
                    key={id}
                    amount={amount_of_stocks} 
                    name={offer.company.name} 
                    time={222}></Transaction>
                )
            ):(
                <p>No offers</p>
            )}
         */