import { Box, Text } from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api"
import { useQuery } from "@tanstack/react-query";
export const Home = () => {

  const { data: pokemonList, error, isLoading } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => PokemonAPI.fetchPokemons(1, 151)
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Oups : {error.message}</div>
  }
  return (

    <Box>
      {JSON.stringify(pokemonList)}
    </Box>

  );
};
