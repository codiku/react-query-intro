import { Box, Center, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PokemonAPI } from '../api/pokemon-api';

export const PokemonDetail = () => {
    const { id } = useParams();
    const { data: pokemon, error, isLoading } = useQuery({ queryKey: ['pokemon', id], queryFn: () => PokemonAPI.fetchPokemon(id) });

    if (isLoading) return  <Center h="100vh"><Spinner size="xl" /></Center>;
    if (error) return <Center h="100vh"><Text color="red.500">Error loading data</Text></Center>;

    return (
        <Center h="100vh">
            <Box textAlign="center" p={5} w={400} bg="gray.50" borderRadius="md" boxShadow="lg">
                <Heading mb={4} >{pokemon.name}</Heading>
                <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} w={300} h={300} borderRadius="full" boxShadow="md" />
                </Box>
                <Text fontSize="lg" mb={2}><strong>Types:</strong> {pokemon.types.join(', ')}</Text>
                <Text fontSize="lg"><strong>Abilities:</strong> {pokemon.moves.map((move) => move.name).join(', ')}</Text>
            </Box>
        </Center>
    );
};