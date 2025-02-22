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

export function Detail() {
  const { id } = useParams();
  const {
    data: pokemon,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => PokemonAPI.fetchPokemon(id),
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const { mutate: createReview } = useMutation({
    mutationKey: ["addReview"],
    mutationFn: (reviewContent) => PokemonAPI.addReview(id, reviewContent),
    onSettled: (reviewResponse) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["reviews", "pokemonId-" + id],
      // });
      queryClient.setQueryData(
        ["reviews", "pokemonId-" + id],
        (oldReviewList) => [...oldReviewList, reviewResponse]
      );
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

  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
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
