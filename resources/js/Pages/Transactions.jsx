import { Link } from "@inertiajs/react"


export default function Transaction({amount, name, offerId}){

    return(
        <div className="px-2 my-1 py-1 w-full flex justify-between bg-white dark:bg-gray-500">
            <div className="py-2 w-[20%] 
            text-center 
            dark:border-orange-400
            border border-1 
            dark:text-white
            border-teal-400
            text-sm
            rounded"> 
                {name}
            </div>
            <div className="py-2 w-[55%] text-center border border-1 
            border-teal-400
            text-sm
            dark:text-white
            dark:border-orange-400
            rounded ">
                {amount} ETH
            </div>
            <div className="py-2 w-[20%] 
            text-center 
            border border-1 
            dark:text-white
            dark:border-orange-400
            border-teal-400
            text-sm
            rounded">
                 <Link href={`/offerProfile/${offerId}`} 
                        class="text-teal-400 
                        dark:text-yellow-400 underline"
                        >
                            <strong>
                            Buy Stocks
                            </strong>
                </Link>
            </div>
        </div>
    )
}