import originalAxios from "axios";

export const axios = originalAxios.create();
axios.interceptors.response.use(async (response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response;
});


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
    try {
      const response = await axios.get(`http://localhost:3090/pokemons/${id}`);
      return response.data;
    } catch (error) {
      throw Error("Error fetching pokemon");
    }
  },
  async fetchReviewsByPokemonId(id) {
    try {
      const response = await axios.get(`http://localhost:3090/reviews?pokemonId=${id}`);
      return response.data;
    } catch (error) {
      throw Error("Error fetching reviews");
    }
  },
  async addReview(pokemonId, content) {
    try {
      const response = await axios.post(`http://localhost:3090/reviews`, {
        pokemonId,
        content,
        author:"me"
      });
      return response.data;
    } catch (error) {
      throw Error("Error adding review");
    }
  },
};
