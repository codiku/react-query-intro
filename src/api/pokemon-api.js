import axios from "axios";

export const PokemonAPI = {
  async fetchPokemons(page, perPage) {
    try {
      const response = await axios.get(
        `http://localhost:3090/pokemons?_page=${page}&_per_page=${perPage}`
      );
      return response.data.data;
    } catch (error) {
      throw Error("Error fetching pokemons");
    }
  },
  async fetchPokemon(id) {
    const response = await axios.get(`http://localhost:3090/pokemons/${id}`);
    return response.data;
  },
};
