import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  Input,
} from "@chakra-ui/react";
import { ReviewList } from "../features/Reviews/ReviewList/ReviewList";
import { useRef } from "react";

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
  const queryClient = useQueryClient();
  const { data: createdReview, mutate: createReview } = useMutation({
    mutationKey: ["addReview"],
    mutationFn: (reviewContent) => PokemonAPI.addReview(id, reviewContent),
    onSettled: () => {
      queryClient.invalidateQueries(["reviews", "pokemonId-" + id]);
    },
  });
  const createReviewAndRefetch = async (reviewContent) => {
    createReview(reviewContent);
  };
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

  const pokemonCard = (
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
            <strong>Types</strong> {pokemon.types.join(", ")}
          </Text>
          <Text fontSize={"lg"} textAlign={"center"}>
            <strong>Abilities</strong>
            {pokemon.moves.map((move) => move.name).join(", ")}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      {pokemonCard}
      <Box mt={5}>
        <ReviewList pokemonId={id} />
      </Box>
      <Input
        w={400}
        mt={10}
        type="text"
        placeholder="Add a review"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createReviewAndRefetch(e.target.value);
          }
        }}
      />
    </Flex>
  );
}
