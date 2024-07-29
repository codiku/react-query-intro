import { Box, Text, List, ListItem } from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api"
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ROUTES } from "../router"
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

    <List>
      {pokemonList.map((pokemon => <ListItem key={pokemon.id}><Link to={ROUTES.detail + "/" + pokemon.id}>{pokemon.name}</Link></ListItem>))}
    </List>

  );
};
