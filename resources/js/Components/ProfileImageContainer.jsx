export default function ProfileImageContainer({image}){

    return(
        <div className="w-full" >
            
            <div style={{width:'100%', height:'220px'}}>
                <img src={`/uploads/${image}`} 
                style={{width:'100%', height:'100%',
                    objectFit:'cover'
                }}
                alt="" />
            </div>
        </div>
    )
}