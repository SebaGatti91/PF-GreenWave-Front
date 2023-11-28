import "../../public/estilos/404.css"
import Link from "next/link";
export default function Custom404() {

  return (
  
    <div className="containers">
      <div className="contenido">
      <div>
      <p className="background-clip-text">Oops!</p>
      </div>
      
      <div className="message">
        <h1>yo habia ponido<br></br> mi pagina aqui!! <br></br> 4♻️4 error </h1>
      <h1></h1>
      <Link href="/">
      <button className="mi-clase">Go to HomePage</button>
      </Link>
    </div>
    </div>
    </div>
   
  );
}
