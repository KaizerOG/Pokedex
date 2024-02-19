import { pokemonDetailServices } from "@/services";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { IPokemonDetailResponse } from "@/interface/pokemonDetails";
import PokemonCard from "@/components/PokemonCard";

type pokemonType = {
  data: IPokemonDetailResponse | undefined;
  loading: boolean;
  error: null | any;
};

const DetailPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState<pokemonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const callData = async (name: string) => {
    try {
      const response = await pokemonDetailServices.getPokemonDetail(name);
      if (response.status === 200) {
        if (response.data)
          setPokemon({
            data: {
              ...response.data,
              image:
                response.data.sprites.other.dream_world.front_default ||
                response.data.sprites.other["official-artwork"].front_default,
            },
            loading: false,
            error: null,
          });
      } else {
        setPokemon({
          data: undefined,
          loading: false,
          error: response.error,
        });
      }
    } catch (error) {
      setPokemon({
        data: undefined,
        loading: false,
        error: error,
      });
    }
  };

  useEffect(() => {
    if (name) callData(name);
  }, [name]);

  return (
    <div className="w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/image/logo.webp"
          alt="logo"
          className="max-h-[80px] mt-[20px]"
        />
      </div>

      <div className="w-[90%] max-w-[600px] m-[auto]">
        <Link
          to={"/"}
          className="bg-[#4cafeb] text-white px-[16px] py-[4px] rounded-[16px] font-semibold "
        >
          Back
        </Link>
        {pokemon.data && (
          <div className=" overflow-hidden rounded-[20px]">
            <div className=" bg-center aspect-square w-full bg-cover rounded-[20px] relative h-[400px] mt-[25px]">
              <img
                className="absolute h-[auto] max-h-[460px] object-cover w-full aspect-square translate-x-[-50%] rounded-tr-[10px] rounded-tl-[10px] translate-y-[-50%] top-[50%] left-[50%] bg-black mt-[15px]"
                src="/image/fgc.jpg "
              ></img>

              <img
                className="absolute rounded-t-lg h-[70%] sm:h-[250px] p-[40px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
                src={pokemon.data.image}
                alt=""
              />
            </div>

            <div className="pt-3 bg-[rgb(39,127,200)]  p-[16px] my-[25px] mt-9 border-8 border-[#289efe] rounded-br-[10px] rounded-bl-[10px] ">
              <div className="flex justify-between">
                <h5 className=" mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                  {pokemon.data.name}
                </h5>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  # {pokemon.data.id}
                </h5>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[20px] gap-y-[30px]">
                <div>
                  <div className="flex gap-x-[10px] font-semibold text-white">
                    <div>Height</div>
                    <div>{(pokemon.data.height / 10).toFixed(2)} m.</div>
                  </div>

                  <div className="flex gap-x-[10px] text-white font-semibold">
                    <div>Weight</div>
                    <div>{(pokemon.data.weight / 10).toFixed(2)} kg.</div>
                  </div>
                </div>
                <div className="flex gap-2 justify-end mt-[16px] text text-black text-sm">
                  {pokemon.data.types.map((item) => {
                    return (
                      <span
                        key={item.type.name}
                        className={`badge-type-${item.type.name} px-[12px] capitalize py-1 rounded-[12px]`}
                      >
                        {item.type.name}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <h5 className="text-white bold font-bold">Abilities</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-[16px] mt-[16px]">
                    {pokemon.data.abilities.map((item) => {
                      return (
                        <div
                          className={`bg-[#4cafeb] capitalize  p-[5px] text-white`}
                        >
                          {item.ability.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h5 className="text-white bold font-bold">Stats</h5>
                  <div className="grid grid-cols-1  gap-[16px] mt-[16px] ">
                    {pokemon.data.stats.map((item) => {
                      return (
                        <div className="flex gap-x-[10px] justify-between">
                          <div
                            className={` capitalize rounded-[10px] p-[5px] text-white`}
                          >
                            {item.stat.name}
                          </div>

                          <div
                            className={` capitalize rounded-[10px] p-[5px] text-white justify-end`}
                          >
                            {item.base_stat}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
