import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { router } from "@inertiajs/react"
import { useForm } from '@inertiajs/react'
import { useState } from 'react';

export default function CompanyForm({auth}){

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    
    const [selectedFile, setSelectedFile] = useState(null);
    
    const { data, setData, put, processing, errors } = useForm({
        founder_id: auth.user.id,
        name: '', 
        description: '',
      })

      function submit(e) {
        e.preventDefault()
        router.post("/createCompany", data)
    }

    const handleName = (e) => {
        setName(e.target.value);
        setData('name', e.target.value)
      };

      const handleDescription = (e) => {
        setDescription(e.target.value);
        setData('description', e.target.value)
      };  

    return(
        <AuthenticatedLayout
        user={auth.user}  
    >

        <div className='bg-gray-900 dark:bg-yellow-400 py-10 pb-36'>

        <h1 className='text-center mt-20 
        dark:text-gray-900
        text-yellow-400
        text-3xl
        font-extrabold
        '>Start Company</h1>
       <form onSubmit={submit} className="flex flex-col 
       mx-auto
       mt-16
       max-w-[450px]">

            <input type="text" 
            
          
            value={name} onChange={handleName}  />
            <textarea name=""
            className='mt-2 rows-30'
            id="" value={description} 
            
            onChange={handleDescription} ></textarea>  

                 
            <button 
            class="py-2.5
            mt-8
            text-sm 
            font-bold 
            text-gray-900 focus:outline-none bg-white  
            border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            > Submit</button>

       </form>
        </div>
      

        <div className='mt-32'>

       

        </div>
        
    </AuthenticatedLayout>
    )
}