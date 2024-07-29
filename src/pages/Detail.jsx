import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PokemonAPI } from "../api/pokemon-api";
import {
  Center,
  Spinner,
  Text,
  Box,
  Heading,
  Image,
  Flex,
} from "@chakra-ui/react";

export function Detail() {
  const { id } = useParams();
  const {
    data: pokemon,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => PokemonAPI.fetchPokemon(id),
    staleTime: 60000,
  });
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size={"xl"} />
      </Center>
    );
  }
  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error.message}</Text>
      </Center>
    );
  }
  return (
    <Flex w={"100%"} justifyContent={"center"} mt={5}>
      <Flex
        p={5}
        w={400}
        bg="gray.50"
        borderRadius="md"
        boxShadow={"lg"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Heading mb={4}>{pokemon.name}</Heading>
        <Box>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt="pokemon image"
          />
        </Box>
        <Flex gap={3} flexDirection={"column"} alignItems={"center"}>
          <Text fontSize={"lg"} textAlign={"center"}>
            <strong>Types</strong> <Box>{pokemon.types.join(", ")}</Box>
          </Text>
          <Text fontSize={"lg"} textAlign={"center"}>
            <strong>Abilities</strong>
            <Box> {pokemon.moves.map((move) => move.name).join(", ")}</Box>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
