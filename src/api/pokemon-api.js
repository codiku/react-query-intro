import axios from "axios";

async function sleep() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return promise;
}

export const PokemonAPI = {
  async fetchPokemons(page, perPage) {
    try {
      await sleep();
      const response = await axios.get(
        `${
          import.meta.env.VITE_POKEMON_API_URL
        }/pokemons?_page=${page}&_per_page=${perPage}`
      );

      return response.data.data;
    } catch (err) {
      throw Error("Error fetching pokemons");
    }
  },
  async fetchPokemon(pokemonId) {
    try {
      await sleep();
      const response = await axios.get(
        `${import.meta.env.VITE_POKEMON_API_URL}/pokemons/${pokemonId}`
      );

      return response.data;
    } catch (err) {
      throw Error("Error fetching pokemon");
    }
  },
  async fetchReviewsByPokemon(pokemonId) {
    try {
      await sleep();
      const response = await axios.get(
        `${import.meta.env.VITE_POKEMON_API_URL}/reviews?pokemonId=${pokemonId}`
      );
      return response.data;
    } catch (err) {
      throw Error("Error fetching reviews for pokemon " + pokemonId);
    }
  },
  async addReview(pokemonId, reviewContent) {
    try {
      await sleep();
      const response = await axios.post(
        `${import.meta.env.VITE_POKEMON_API_URL}/reviews`,
        {
          pokemonId,
          content: reviewContent,
          author: "Me",
        }
      );
      return response.data;
    } catch (err) {
      throw Error("Error adding review for pokemon " + pokemonId);
    }
  },
};
