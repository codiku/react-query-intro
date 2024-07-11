import axios from "axios";

export const PokemonAPI = {
  async fetchPokemons(limit, offset) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      return response.data.results;
    } catch (error) {
      throw Error("Error fetching pokemons");
    }
  },
};
