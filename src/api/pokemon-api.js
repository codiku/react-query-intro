import axios from "axios";

export const PokemonAPI = {
  async fetchPokemons(page, perPage) {
    try {
      const response = await axios.get(
        `http://localhost:3000/pokemons?_page=${page}&_per_page=${perPage}`
      );
      return response.data.results;
    } catch (error) {
      throw Error("Error fetching pokemons");
    }
  },
  async fetchPokemon(id) {
    const response = await axios.get(`http://localhost:3000/pokemons/${id}`);
    return response.data;
  },
};
