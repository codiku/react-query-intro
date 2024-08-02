import { Box, Text, List, ListItem, Image, Container } from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ROUTES } from "../router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PER_PAGE = 5;
const MAX_PAGE = 20;

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
      <List spacing={3} w="100%" minH={400}>
        {pokemonList?.map((poke, index) => (
          <ListItem
            onClick={() => navigate(ROUTES.detail + `/${poke.id}`)}
            key={poke.name}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            cursor={"pointer"}
          >
            <Image
              boxSize="50px"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
              alt={poke.name}
              mr={4}
            />
            {poke.name}
          </ListItem>
        ))}
        {isLoading &&
          [...Array(PER_PAGE)].map((_, index) => (
            <ListItem key={index}>
              <Skeleton height="68px" />
            </ListItem>
          ))}
        {error && <Text>Error fetching data</Text>}
      </List>
    </Container>
  );
};
