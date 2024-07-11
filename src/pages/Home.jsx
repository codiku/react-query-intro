import { useState } from "react";
import { Box, Text, List, ListItem, Spinner, Button, HStack, VStack, Center, Image } from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api";
import { useQuery } from "@tanstack/react-query";

const LIMIT = 5;

export const Home = () => {
  const [offset, setOffset] = useState(0);

  const { data: pokemonList, isLoading, error } = useQuery({
    queryKey: ["pokemons", "offset-" + offset + "-" + (offset + LIMIT)],
    queryFn: () => PokemonAPI.fetchPokemons(LIMIT, offset),
  });

  const loadNextPage = async () => {
    if (offset < 100) {
      setOffset(offset + LIMIT);
    }
  };

  const loadPreviousPage = async () => {
    if (offset >= 10) {
      setOffset(offset - LIMIT);
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Pokemon list</Text>
      <VStack spacing={4}>
        <List spacing={3} w="100%" minH={200}>
          {pokemonList?.map((poke, index) => (
            <ListItem key={poke.name} p={2} borderWidth="1px" borderRadius="md" display="flex" alignItems="center">
              <Image
                boxSize="50px"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1 + offset}.png`}
                alt={poke.name}
                mr={4}
              />
              {poke.name}
            </ListItem>
          ))}
          {isLoading && <Spinner />}
          {error && <Text>Error fetching data</Text>}
        </List>
        <HStack spacing={4}>
          <Button onClick={loadPreviousPage} isDisabled={offset < 10}>Load previous page</Button>
          <Button onClick={loadNextPage} isDisabled={offset >= 100}>Load next page</Button>
        </HStack>
        <Box mt={4} w="100%">
          <Center>
            {[...Array(LIMIT)].map((_, index) => {
              const offsetValue = index * LIMIT;
              return (
                <Button variant={"link"} key={offsetValue} onClick={() => setOffset(offsetValue)} w={"24"}>
                  {offsetValue}-{offsetValue + LIMIT}
                </Button>
              );
            })}
          </Center>
        </Box>
      </VStack>
    </Box>
  );
};