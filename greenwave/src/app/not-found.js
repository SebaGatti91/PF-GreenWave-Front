import Link from "next/link";
import '../../public/estilos/notFound.css'

export default function Custom404() {

  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-full error">
      <img
        src="/images/404.png"
        id="pic"
        className="h-screen"
      />
      <img
        src="/images/noencontrado1.png"
        id="pictu"
        className="h-screen lg:hidden"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center mt-14">
          <Link href="/homepage" className="px-2 py-1 rounded-lg bg-hover hover:bg-hover-clear" style={{ border: '1px solid gray' }}>
            <button className="mi-clase">Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
