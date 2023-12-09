export const Footer = () => {
  return (
    <div style={{ background: 'linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)' }}
      className="p-2 px-4 text-white">

      <div className="flex flex-row justify-start items-center">
        <img
          src="/images/ubicacion.png"
          alt="ubication"
          style={{ width: "22px", height: "22px" }}
        />
        <p className="text-left text-lg ml-4 py-2">1234 Elm Street Suite 567 Citytown</p>
      </div>

      <div className="pt-1 pb-3">
        <a className="flex flex-row justify-start items-center" href="mailto:greenwave.page@gmail.com">
          <img
            src="/images/correo.png"
            alt="mail"
            style={{ width: "22px", height: "22px" }}
          />
          <p className="text-left ml-4 text-lg">greenwave.page@gmail.com</p>
        </a>
      </div>

      <div className="pt-1 pb-1">
        <a className="flex flex-row justify-start items-center" href="tel:202-555-0128">
          <img
            src="/images/telefono.png"
            alt="phone"
            style={{ width: "22px", height: "22px" }}
          />
          <p className="text-left ml-4 text-lg">202-555-0128</p>
        </a>
      </div>

      <div className="flex flex-row justify-start items-center pt-4">
        <img
          src="/images/terminos.png"
          alt="mail"
          style={{ width: "22px", height: "22px", }}
        />
        <p className="text-start ml-4">
          <a href="/terms">Terms and Conditions</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
      <p className="text-center text-lg py-2 pt-2">© 2023 Company, Inc. All rights reserved.</p>
    </div>
  );
};

