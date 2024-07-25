import ReactTypingEffect from "react-typing-effect";

export default  function Head(){

    return(
       <div className="h-[40px]">

           <ReactTypingEffect
             text={["Let's grow together", "Find your investors"]}
             eraseSpeed={300}
             cursor=" "
             displayTextRenderer={(text, i) => {
               return (
                 <h1>
                   {text.split('').map((char, i) => {
                     const key = `${i}`;
                     return (
                       <span
                         key={key}
                         className="text-3xl text-gray-900 font-extrabold dark:text-yellow-400"
                         >{char}</span>
                        );
                    })}
                 </h1>
               );
            }}        
            />
       </div>
    )
}
/*
style={i%2 === 0 ? { color: 'magenta'} : {}}*/