import { List, ListItem, Container, Image } from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "../router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const PER_PAGE = 5;

export const Home = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemons", "page-" + page],
    queryFn: () => PokemonAPI.fetchPokemons(page, PER_PAGE),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oups : {error.message}</div>;
  }
  return (
    <Container mt={10}>
      <List spacing={3} w="100%">
        {pokemonList.map((pokemon) => (
          <ListItem
            onClick={() => navigate(ROUTES.detail + "/" + pokemon.id)}
            key={pokemon.id}
            p={2}
            borderWidth={"1px"}
            borderRadius={"md"}
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
          >
            <Image
              boxSize={"50px"}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt="pokemon image"
            />
            {pokemon.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
