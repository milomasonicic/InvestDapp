import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from "@inertiajs/react"
import { useForm } from '@inertiajs/react'
import { useState, useEffect } from 'react';
import {usePage} from '@inertiajs/react'

export default function ImageUpload({auth}){
   
    const {id, name} = usePage().props;
  

   
  const [selectedFile, setSelectedFile] = useState(null);
    
  const { data, formData,  setData, put, reset,  progress } = useForm({
    
      file: null,
      compID: id,
      company_name:name,
    })

    useEffect(() => {
        setData("company_id", id);
        setData("name", name);
    }, [id, name])  

  const handleImageChange = (e) => {
    const file = e.target.files[0];  
    if (file) {
        const fileUrl = URL.createObjectURL(file);
        setSelectedFile(fileUrl);
        setData('file', e.target.files[0]);
    }    
    }
    
    const renderPhotos = (source) => {
      
        return   <div style={{width: "100%", 
                           
                            height: "240px"}}>
                    <img 
                    style={{width: "100%", 
                        objectFit:"contain",
                        height: "100%"}}
                    src={source} alt=""  />
            </div>
    
    }

    function submit(e) {
        e.preventDefault()
        router.post("/imagestore", data)
    }

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
        '>Upload Profile Picture</h1>
        <h3 className='text-center 
        dark:text-gray-900
        text-yellow-400
       
        font-extrabold
        '>Company Id:#{id}</h3>

        <h3 className='text-center 
        dark:text-gray-900
        text-yellow-400
        
        font-extrabold
        '>Company Name: {name}</h3>

        <form onSubmit={submit} className="flex flex-col 
        mx-auto
        mt-16
        max-w-[450px]">

            <input onChange={handleImageChange} type="file" name="" id="" />
            <div className='w-[full]'> 
                {renderPhotos(selectedFile)} </div>
                
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

        <div>
        </div>

            </AuthenticatedLayout>
           
        )
}