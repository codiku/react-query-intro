import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { PokemonAPI } from "../api/pokemon-api"
import { useEffect } from "react";
export const Home = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPokemons() {
    try {
      setIsLoading(true)
      const pokemonResponse = await PokemonAPI.fetchPokemons(1, 151)
      setPokemonList(pokemonResponse)

    } catch (err) {
      setErrorMessage(err.message)

    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadPokemons()
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (errorMessage) {
    return <div>Oups : {errorMessage}</div>
  }
  return (

    <Box>
      {JSON.stringify(pokemonList)}
    </Box>

  );
};
