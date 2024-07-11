import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Image, Heading, Spinner, Text } from '@chakra-ui/react';
import { PokemonAPI } from '../api/pokemon-api';
import { useParams } from 'react-router-dom';

export const PokemonDetail = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useQuery({ queryKey: ['pokemon', id], queryFn: () => PokemonAPI.fetchPokemon(id) });

    if (isLoading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error loading data</Text>;

    return (
        <Box textAlign="center" p={5}>
            <Heading mb={4}>{data.name}</Heading>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={data.sprites.front_default} alt={data.name} w={300} h={300} />
            </Box>
            <Text>{data.abilities.map((ability) => ability.ability.name).join(', ')}</Text>
        </Box>
    );
};