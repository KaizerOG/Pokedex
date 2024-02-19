import PokemonCard from '@/components/PokemonCard';
import SearchForm from '@/components/Searchform';
import { usePokemonListStore } from "@/store/pokemonList";
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon,fetchPokemon } = usePokemonListStore();
  console.log(pokemon);

  return (
    <div className="w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/image/logo.webp"
          alt="logo"
          className="max-h-[80px] mt-[20px]"
        />
      </div>
      <SearchForm />

      {fetchPokemon.loading && (
        <div className="h-[800px] flex justify-center items-center ">
          <ReactLoading
            type="spin"
            color="white"
            height={"20%"}
            width={"20%"}
          />
        </div>
      )}

      {!fetchPokemon.loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-[20px] mt-[40px]">
          {pokemon.data?.map((item) => (
            <PokemonCard
              key={item.id}
              image={item.image || "undefined"}
              name={item.name}
              id={item.id}
              types={item.types}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;