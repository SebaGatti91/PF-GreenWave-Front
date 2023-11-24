"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Card = ({ id, name, img, price, description, showdescription=false, showStars=true, showbuybutton=true}) => {

  const [fav, setFav] = useState(false);

  const handleFavorite = () => {
    if (fav) {
      setFav(false);
    } else {
      setFav(true);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-md m-3 max-w-xs flex flex-col relative">
      <div className="absolute top-0 right-0 m-2">
        {fav ? (
          <button onClick={handleFavorite}>💚</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
      </div>

      <div className="flex-grow flex-shrink-0">
        <Image
          src={img}
          alt={name}
          height={150}
          width={150}
          className="w-80 h-60 rounded-md"
        />
      </div>

      <div className="mt-2 flex-grow-0 flex flex-col items-center">

        <h3 className="text-center font-bold">{name}</h3>
        <h3 className="text-green-600  text-center">USD {price}</h3>
        <div>
        {showStars && (
          <div className="flex justify-center items-center">
            ⭐️⭐️⭐️⭐️⭐️
          </div>
          )}
           {showbuybutton && (
             <div>
          <button className="p-1 m-2 rounded-lg bg-yellow-500">
            Add to Cart
          </button>
          <Link href={`/store/${id}`}>
            <button
              className="p-1 bg-yellow-500 rounded-full "
              style={{ backgroundColor: "rgba(170, 180, 154, 0.5)" }}
            >
              🔍
            </button>
          </Link>
          </div>
           )}

        </div>
        
       
      </div>
    </div>
  );
};

export default Card;
