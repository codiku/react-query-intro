import {
  List,
  ListItem,
  Container,
  Image,
  Button,
  HStack,
  Skeleton,
  Center,
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
  console.log(pokemonList);
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
        {isLoading &&
          Array.from({ length: PER_PAGE }).map((_, i) => (
            <ListItem key={"skeleton" + i}>
              <Skeleton height={"68px"} />
            </ListItem>
          ))}
      </List>
      <HStack space={4} display={"flex"} justifyContent={"center"} mt={10}>
        <Button onClick={loadPreviousPage} isDisabled={page === 1}>
          Load previous page
        </Button>
        <Button onClick={loadNextPage} isDisabled={page === MAX_PAGE}>
          Load next page
        </Button>
      </HStack>
      <Center mt={10}>
        {Array.from({ length: MAX_PAGE }).map((_, i) => (
          <Button
            variant={page == i + 1 ? "solid" : "link"}
            key={i}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Center>
    </Container>
  );
};
