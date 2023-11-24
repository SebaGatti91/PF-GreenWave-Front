import Image from "next/image";
import Button from "../button/Button";

const Card = ({ id, name, img, price }) => {
  return (
    <div className="bg-white rounded-md p-4 w-64 flex flex-col items-center">
      <div className="w-8 h-8">
        <Image
          src="/images/corazon.png"
          alt="corazonImage"
          layout="responsive"
          objectFit="contain"
          className="rounded-md"
          height={150}
          width={150}
        />
      </div>
      <div className="flex-grow flex-shrink-0">
        <Image
          src={img}
          alt={name}
          height={150}
          width={150}
          className="rounded-md w-full"
        />
      </div>
      <div className="mt-2 flex-grow-0 flex flex-col items-center">
        <h3 className="text-center">{name}</h3>
        <h3 className="text-green-600 font-bold text-center">USD {price}</h3>
        <Button
          className="py-1 px-10 mr-10 bg-hover hover:bg-boton"
          style={{
            fontFamily: "font-serif",
            borderRadius: "2em 2em",
            boxShadow: "2px 3px black",
          }}
          link={`store/${id}`}
          text="Buy"
        />
        <div className="w-24 h-24">
          <Image
            src="/images/estrellas.png"
            alt="raitingImage"
            layout="responsive"
            objectFit="contain"
            className="rounded-md"
            height={150}
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
