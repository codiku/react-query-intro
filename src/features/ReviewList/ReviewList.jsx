import {
  Alert,
  AlertIcon,
  List,
  ListItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PokemonAPI } from "../../api/pokemon-api";

const ReviewList = ({ pokemonId }) => {
  const {
    data: reviews = [],
    error,
    isFetching,
  } = useQuery({
    queryKey: ["reviews", "pokemonId-" + pokemonId],
    queryFn: () => PokemonAPI.fetchReviewsByPokemon(pokemonId),
  });

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading reviews
      </Alert>
    );

  return (
    <List spacing={3} h={300} overflowY="auto" w={400}>
      {reviews.map((review) => (
        <ListItem key={review.id} p={3} shadow="md" borderWidth="1px">
          {review.content}
          <Text fontSize="xs" color="gray.500">
            By {review.author}
          </Text>
        </ListItem>
      ))}
      {isFetching &&
        [...Array(5)].map((_, index) => (
          <ListItem key={index}>
            <Skeleton height="68px" />
          </ListItem>
        ))}
      {reviews?.length === 0 && (
        <Text>No reviews found. Be the first to create one !</Text>
      )}
    </List>
  );
};

export default ReviewList;
