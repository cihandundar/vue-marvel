import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
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
    SET_CHARACTER(state, character) {
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
          commit("SET_CHARACTER", response.data.data.results[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});

export default store;
