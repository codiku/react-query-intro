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
export const ReviewList = ({ pokemonId }) => {
  const reviewListRef = useRef(null);

  const {
    data: reviews = [],
    isLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: ["reviews", "pokemonId-" + pokemonId],
    queryFn: () => PokemonAPI.fetchReviewsByPokemon(pokemonId),
  });

  const optimisticReviewContent = useMutationState({
    filters: {
      mutationKey: ["addReview"],
      status: "pending",
    },
    select: (mutation) => mutation.state.variables,
  });

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading reviews
      </Alert>
    );
  }
  useEffect(() => {
    if (optimisticReviewContent.length > 0) {
      reviewListRef.current.scrollTo({
        top: reviewListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [optimisticReviewContent]);

  return (
    <List overflowY="auto" height="300px" width="400px" ref={reviewListRef}>
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
      {optimisticReviewContent.length > 0 && (
        <ListItem
          opacity={0.5}
          p={3}
          boxShadow="sm"
          borderWidth="1px"
          mb={2}
          borderRadius="md"
          bg="white"
        >
          {optimisticReviewContent}
          <Text fontSize={"xs"} color="gray.500">
            Me
          </Text>
        </ListItem>
      )}
    </List>
  );
};
