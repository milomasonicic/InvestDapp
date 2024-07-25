import Button from "./CallToActionButton"
import Head from "./Head"
export default function LandingPage({user}){


    return(
        <div className="mx-auto px-4 bg-red-300 dark:bg-gray-900 h-[500px] 
        flex  flex-col items-center justify-center">
            <Head></Head>
            <Button></Button>
        </div>

    )

}