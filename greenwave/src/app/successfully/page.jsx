import Link from "next/link";

export default function Sucess(){
    return(
        <div className="m-3 flex flex-col justify-center items-center" style={{height: "69.5vh"}}>
            <h1 className="text-3xl font-bold text-center">Your purchase has been a success!</h1>
            <span>Thank you for choosing us</span>
            <Link href="/homepage">
            <button>Back to Home</button>
            </Link>
        </div>
    )
}