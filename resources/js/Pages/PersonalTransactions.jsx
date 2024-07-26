import axios from "axios"
import { useState, useEffect } from "react"


export default function History({userId}){


    async function getHistoryInfo() {

        try{

            await axios.get(`http://founders.test/api/personalTransaction/${userId}`)

        } catch(error){
            console.error(error)
        }
    }

    return(
        <div>

        </div>
    )
}