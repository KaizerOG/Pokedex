import React, { useEffect } from "react";
import { pokemonListServices, pokemonDetailServices } from "@/services";
import { usePokemonListStore } from "@/store/pokemonList";
import { useForm } from "react-hook-form";
import { generationList } from "@/utils/optionList";
import { IPokemonDetailResponse } from "@/interface/pokemonDetails";

const useSearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setFetchPokemonList, fetchPokemon, setPokemonList } =
    usePokemonListStore();

  const keyword = watch("keyword") || "" ;
  const type = watch("type") || "";
  const generation = watch("generation");
  const sort = watch("sort");

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    const responseList = await pokemonListServices.getPokemonList(
      filter.limit,
      filter.offset
    );
    const pokeList = [];
    setFetchPokemonList({ data: [], loading: true, error: null });

    if (responseList.status === 200) {
      const responseResult = responseList.data?.results || [];
      for (const pokemon of responseResult) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon.name
        );
        const pokeData = response.data;
        if (pokeData)
          pokeList.push({
            ...pokeData,
            image:
              pokeData.sprites.other.dream_world.front_default ||
              pokeData.sprites.other["official-artwork"].front_default,
          });
      }
      setFetchPokemonList({ data: pokeList, loading: false, error: null });
      const data = filterPokemon(pokeList, keyword, type, sort);
      setPokemonList({ data: data, loading: false, error: null });
    } else {
      setFetchPokemonList({
        data: [] || null,
        loading: false,
        error: responseList.error,
      });
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      callData(generationList[generation]);
    }
  }, [generation]);

  const filterPokemon = (
    pokeList: IPokemonDetailResponse[],
    keyword: string,
    type: string,
    sort: "id" | "name"
  ) => {
    const keywordFilter = pokeList.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    const typeFilter =
      type !== "all types"
        ? keywordFilter.filter((item) =>
            item.types.find((f) =>
              f.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : keywordFilter;

    return sortBy(typeFilter, sort);
  };

  const sortBy = (data: IPokemonDetailResponse[], type: "id" | "name") => {
    switch (type) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      callData(generationList[generation]);
    }
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, type, sort);
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword, type, sort]);

  return {
    fieldKeyword: register("keyword"),
    fieldGenaration: register("generation"),
    fieldType: register("type"),
    fieldSort: register("sort"),
  };
};

export { useSearchForm };
