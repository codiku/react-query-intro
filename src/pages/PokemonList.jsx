import { useState } from "react";
import { Box, Text, List, ListItem, Button, HStack, VStack, Stack, Center, Image } from "@chakra-ui/react";
import { PokemonAPI } from "../api/pokemon-api";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "../router";
import { useNavigate } from "react-router-dom";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const OFFSET_STEP = 5;
const MAX = 100
export const PokemonList = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  const { data: pokemonList, isLoading, error } = useQuery({
    queryKey: ["pokemons", "offset-" + offset + "-" + (offset + OFFSET_STEP)],
    queryFn: () => PokemonAPI.fetchPokemons(OFFSET_STEP, offset),
  });

  const loadNextPage = async () => {
    if (offset < MAX) {
      setOffset(offset + OFFSET_STEP);
    }
  };

  const loadPreviousPage = async () => {
    if (offset >= OFFSET_STEP) {
      setOffset(offset - OFFSET_STEP);
    }
  };
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Pokedex</Text>
      <VStack spacing={4}>
        <List spacing={3} w="100%" minH={400}>
          {pokemonList?.map((poke, index) => (
            <ListItem onClick={() => navigate(ROUTES.pokemonDetail + `/${(index + 1) + offset}`)} key={poke.name} p={2} borderWidth="1px" borderRadius="md" display="flex" alignItems="center" cursor={"pointer"}>
              <Image

                boxSize="50px"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1 + offset}.png`}
                alt={poke.name}
                mr={4}
              />
              {poke.name}

            </ListItem>
          ))}
          {isLoading &&
            [...Array(OFFSET_STEP)].map((_, index) => (
              <ListItem key={index}>
                <Skeleton height='68px' />
              </ListItem>
            ))
          }

          {error && <Text>Error fetching data</Text>}
        </List>
        <HStack spacing={4}>
          <Button onClick={loadPreviousPage} isDisabled={offset < OFFSET_STEP}>Load previous page</Button>
          <Button onClick={loadNextPage} isDisabled={offset + OFFSET_STEP >= MAX}>Load next page</Button>
        </HStack>
        <Box mt={4} >
          {[...Array(MAX / OFFSET_STEP)].map((_, index) => {
            const offsetValue = index * OFFSET_STEP;
            return (
              <Button variant={offset === offsetValue ? "solid" : "link"} key={offsetValue} onClick={() => setOffset(offsetValue)} w={"24"}>
                {offsetValue === 0 ? "1" : offsetValue}-{offsetValue + OFFSET_STEP}
              </Button>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
};