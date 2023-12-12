import Link from "next/link";
export default function Custom404() {

  return (

    <div className="flex justify-center items-center h-screen w-full"
      style={{ backgroundImage: "url('/images/404.png')", backgroundSize: "cover", backgroundPosition: "center center", height: "100vh" }}>
      <div className="text-center mt-20">
        <Link href="/homepage" className="px-2 py-1 rounded-lg bg-hover hover:bg-hover-clear" style={{border: '1px solid gray'}}>
          <button className="mi-clase">Go to Home</button>
        </Link>
      </div>
    </div>

  );
}
