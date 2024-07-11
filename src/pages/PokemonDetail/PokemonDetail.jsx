import { Box, Center, Heading, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PokemonAPI } from '../../api/pokemon-api';
import ReviewList from '../../features/ReviewList';

export const PokemonDetail = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { data: pokemon, error, isLoading } = useQuery({ queryKey: ['pokemon', id], queryFn: () => PokemonAPI.fetchPokemon(id) });

    const { data: createdReview, mutateAsync: createReview } = useMutation({
        mutationFn: (reviewContent) => PokemonAPI.addReview(id, reviewContent)
    });





    if (isLoading) return <Center h="100vh"><Spinner size="xl" /></Center>;
    if (error) return <Center h="100vh"><Text color="red.500">Error loading data</Text></Center>;

    const createReviewAndRefetch = async (reviewContent) => {
        await createReview(reviewContent);
        queryClient.invalidateQueries(['reviews', "pokemonId-" + id]);
    };
    return (
        <VStack mt={10}>
            <Box textAlign="center" p={5} w={400} bg="gray.50" borderRadius="md" boxShadow="lg">
                <Heading mb={4} >{pokemon.name}</Heading>
                <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} w={100} h={100} borderRadius="full" boxShadow="md" />
                </Box>
                <Text fontSize="lg" mb={2}><strong>Types:</strong> {pokemon.types.join(', ')}</Text>
                <Text fontSize="lg"><strong>Abilities:</strong> {pokemon.moves.map((move) => move.name).join(', ')}</Text>
            </Box>
            <Box >
                <Text my={4} fontSize="xl" fontWeight="bold">Reviews</Text>
                <ReviewList pokemonId={id} />
                <Input mt={10} type="text" placeholder="Add a review" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        createReviewAndRefetch(e.target.value);
                    }
                }} />
            </Box>
        </VStack>
    );
};