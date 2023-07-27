import axios from "axios";

export default {
  state: {
    cartItems: [],
    character: {
      name: "",
      thumbnail: {
        path: "",
        extension: "",
      },
      description: "",
    },
  },
  mutations: {
    setCharacter(state, character) {
      state.character = character;
    },
  },
  actions: {
    fetchCharacter({ commit }, characterId) {
      const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}`;
      const apiKey = "60645b73c441bf294a3a3a07b50bfafe";
      const hash = "2bd018a8f222867e396d936c173bb3d8";

      axios
        .get(apiUrl, {
          params: {
            apikey: apiKey,
            hash: hash,
          },
        })
        .then((response) => {
          const character = response.data.data.results[0];
          commit("setCharacter", character);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
