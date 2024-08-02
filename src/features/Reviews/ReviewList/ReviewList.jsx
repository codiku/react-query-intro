import {
  Box,
  List,
  ListItem,
  Text,
  Skeleton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { PokemonAPI } from "../../../api/pokemon-api";
import { useRef } from "react";
import { useEffect } from "react";
export function ReviewList({ pokemonId }) {
  const listRef = useRef();
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", "pokemonId-" + pokemonId],
    queryFn: () => PokemonAPI.fetchReviewsByPokemon(pokemonId),
  });

  const optimisticsReviewContent = useMutationState({
    filters: {
      mutationKey: ["addReview"],
      status: "pending",
    },
    select: (mutation) => mutation.state.variables,
  });

  useEffect(() => {
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [optimisticsReviewContent.length]);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading reviews
      </Alert>
    );
  }
  useEffect(() => {
    if (optimisticsReviewContent.length > 0) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [optimisticsReviewContent]);

  return (
    <List spacing={3} h={300} overflowY={"auto"} w={400} ref={listRef}>
      {isLoading ? (
        [...Array(5)].map((_, i) => (
          <ListItem key={`skeleton-${i}`} mb={2}>
            <Skeleton height={"67.81px"} />
          </ListItem>
        ))
      ) : reviews?.length === 0 ? (
        <Text>No reviews found. Be the first to create one !</Text>
      ) : (
        reviews.map((review) => (
          <ListItem
            key={review.id}
            p={3}
            boxShadow="sm"
            borderWidth="1px"
            mb={2}
            borderRadius="md"
            bg="white"
          >
            <Text>{review.content}</Text>
            <Text fontSize={"xs"} color="gray.500">
              {review.author}
            </Text>
          </ListItem>
        ))
      )}
      {optimisticsReviewContent.length > 0 && (
        <ListItem opacity={0.5} p={3} shadow={"md"} borderWidth={"1px"}>
          {optimisticsReviewContent[0]}
          <Text fontSize={"xs"} color="gray.500">
            Me
          </Text>
        </ListItem>
      )}
    </List>
  );
}
