import {
  List,
  ListItem,
  Container,
  Image,
  HStack,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "../router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PER_PAGE = 5;
const MAX_PAGE = 20;

export const Home = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    data: pokemonList = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemons", "page-" + page],
    queryFn: () => PokemonAPI.fetchPokemons(page, PER_PAGE),
    staleTime: Infinity,
  });

  const loadNextPage = async () => {
    if (page < MAX_PAGE) {
      setPage((page) => page + 1);
    }
  };

  const loadPreviousPage = async () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  if (error) {
    return <div>Oups : {error.message}</div>;
  }
  console.log(pokemonList, isLoading);
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
        {isLoading &&
          Array.from({ length: PER_PAGE }).map((_, i) => (
            <ListItem key={"skeleton" + i}>
              <Skeleton height={"68px"} />
            </ListItem>
          ))}
      </List>
      <HStack spacing={4} display={"flex"} justifyContent={"center"} mt={10}>
        <Button onClick={loadPreviousPage} isDisabled={page === 1}>
          Load previous page
        </Button>
        <Button onClick={loadNextPage} isDisabled={page == MAX_PAGE}>
          Load next page
        </Button>
      </HStack>
    </Container>
  );
};
