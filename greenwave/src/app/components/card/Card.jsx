"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

const Card = ({ id, name, img, price }) => {

  const[fav,setFav] = useState(false)

  const handleFavorite = () =>{
    if(fav){
       setFav(false)
    }else{
       setFav(true)
    }
 }

  return (
    // <Link  href={`/store/${id}`}>
    <div className="bg-white shadow-2xl rounded-md p-5 m-3 max-w-xs flex flex-col">
    <div className="flex justify-end">
    {
             fav ? (
               <button onClick={handleFavorite}>💚</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
    </div>
      <div className="flex-grow flex-shrink-0">
        <Image
          src={img}
          alt={name}
          height={150}
          width={150}
          className="rounded-md w-96 h-60"
        />
      </div>
      <div className="mt-2 flex-grow-0 flex flex-col items-center">
        <h3 className="text-center">{name}</h3>
        <h3 className="text-green-600 font-bold text-center">USD {price}</h3>
        <div className="m-2">
          <button className="p-2 rounded-lg bg-yellow-500 hover:bg-hover">Add to Cart</button>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default Card;
