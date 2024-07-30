import {
  Box,
  List,
  ListItem,
  Text,
  Skeleton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PokemonAPI } from "../../../api/pokemon-api";
export function ReviewList({ pokemonId }) {
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", "pokemonId-" + pokemonId],
    queryFn: () => PokemonAPI.fetchReviewsByPokemon(pokemonId),
  });

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading reviews
      </Alert>
    );
  }
  return (
    <List spacing={3} h={300} overflowY={"auto"} w={400}>
      {isLoading ? (
        [...Array(5)].map((_, i) => (
          <ListItem key={"skeleton" + i}>
            <Skeleton height={"67.81px"} />
          </ListItem>
        ))
      ) : reviews?.length === 0 ? (
        <Text>No reviews found. be the first to create one !</Text>
      ) : (
        reviews.map((review) => (
          <ListItem key={review.id} p={3} shadow={"md"} borderWidth={"1px"}>
            {review.content}
            <Text fontSize={"xs"} color="gray.500">
              {review.author}
            </Text>
          </ListItem>
        ))
      )}
    </List>
  );
}
