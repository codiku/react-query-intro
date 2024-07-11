import { Box, Button, HStack, Image, List, ListItem, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonAPI } from "../api/pokemon-api";
import { ROUTES } from "../router";

const PER_PAGE = 5;
const MAX_PAGE = 20;

export const PokemonList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data: pokemonList, isLoading, error } = useQuery({
    queryKey: ["pokemons", "page-" + page],
    queryFn: () => PokemonAPI.fetchPokemons(page, PER_PAGE),
  });

  console.log("pokemon list", pokemonList)
  const loadNextPage = async () => {
    if (page < MAX_PAGE ) {
      setPage(page => page + 1);
    }
  };

  const loadPreviousPage = async () => {
    if (page > 1) {
      setPage(page => page - 1);
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Pokedex</Text>
      <VStack spacing={4}>
        <List spacing={3} w="100%" minH={400}>
          {pokemonList?.map((poke, index) => (
            <ListItem onClick={() => navigate(ROUTES.pokemonDetail + `/${(index + 1) + page * PER_PAGE}`)} key={poke.name} p={2} borderWidth="1px" borderRadius="md" display="flex" alignItems="center" cursor={"pointer"}>
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
                <Skeleton height='68px' />
              </ListItem>
            ))
          }
          {error && <Text>Error fetching data</Text>}
        </List>
        <HStack spacing={4}>
          <Button onClick={loadPreviousPage} isDisabled={page === 1}>Load previous page</Button>
          <Button onClick={loadNextPage} isDisabled={page == MAX_PAGE }>Load next page</Button>
        </HStack>
        <Box mt={4}>
          {[...Array(MAX_PAGE)].map((_, index) => (
            <Button variant={page === index+1 ? "solid" : "link"} key={index} onClick={() => setPage(index+1)} w={"24"}>
              {index + 1}
            </Button>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};