import './Footer.css'

export const Footer = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
      }}
      className=" text-white contenedor"
    >
      <div className="m-3 flex justify-between pie">
        <div className="flex flex-row justify-start items-center">
          <img
            src="/images/ubicacion (1).png"
            alt="ubication"
            style={{ width: "22px", height: "22px" }}
          />
          <p className="text-left text-lg ml-4">
            1234 Elm Street Suite 567 Citytown
          </p>
        </div>

        <div>
          <a
            className="flex flex-row justify-start items-center email"
            href="mailto:greenwave.page@gmail.com"
          >
            
            <p className="text-left text-lg mr-3 parrafo">greenwave.page@gmail.com</p>
            <img
              src="/images/correo.png"
              alt="mail"
              style={{ width: "22px", height: "22px" }}
              
            />
          </a>
        </div>
      </div>

      <div className="m-3 flex justify-between pie">
        <div>
          <a
            className="flex flex-row justify-start items-center"
            href="tel:202-555-0128"
          >
            <img
              src="/images/telefono.png"
              alt="phone"
              style={{ width: "22px", height: "22px" }}
            />
            <p className="text-left ml-4 text-lg">202-555-0128</p>
          </a>
        </div>

        <div className="flex flex-row justify-start items-center terminos">
          
          <p className="mr-3 parrafo">
            <a href="/terms">Terms and Conditions</a> |{" "}
            <a href="/privacy">Privacy Policy</a>
          </p>
          <img
            src="/images/terminos.png"
            alt="mail"
            style={{ width: "22px", height: "22px" }}
            
          />
        </div>
      </div>

      <p className="text-center text-lg mb-3 ">
        © 2023 Company, Inc. All rights reserved.
      </p>
    </div>
  );
};
