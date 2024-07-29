import axios from "axios";

export const PokemonAPI = {
  async fetchPokemons(page, perPage) {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_POKEMON_API_URL
        }/pokemons?_page=${page}&_per_pages=${perPage}`
      );
      return response.data.data;
    } catch (err) {
      console.log(err);
      throw Error("Error fetching pokemons");
    }
  },
  async fetchPokemon(pokemonId) {},
  async fetchReviewsByPokemon(pokemonId) {},
  async addReview(pokemonId, review) {},
};
