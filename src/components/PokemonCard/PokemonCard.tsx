import { IPokemonDetailResponse, Type } from "@/interface/pokemonDetails";
import React from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  image: string;
  name: string;
  id: number;
  types: Type[];
}
const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {
  return (
    <div className="rounded-[20px]  bg-[#248ee5] border-gray-200 shadow  dark:border-gray-700 p-[10px] max-w-[275px] transition ease-in-out ">
      <div className="bg-[url('/image/asf.jpg')] bg-center aspect-square w-full bg-cover rounded-[20px] p-0 ">
        <Link
          to={`/detail/${name}`}
          className="bg-[url('/image/poke-card-bg.png')]"
        >
          <img
            className="rounded-t-lg max-h-[218px] p-[40px] w-full "
            src={image}
            alt=""
          />
        </Link>
      </div>

      <div className="pt-3">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
            {name}
          </h5>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            # {id}
          </h5>
        </div>
        <div className="flex gap-2 justify-start text text-black text-sm">
          {types.map((item) => {
            return (
              <span
                className={`badge-type-${item.type.name} px-[12px] capitalize py-1 rounded-[12px]`}
              >
                {item.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
