<template>
  <section>
    <div class="details">
      <div class="details__left">
        <img
          :src="
            character?.thumbnail.path + '.' + character?.thumbnail?.extension
          "
          :alt="character?.name"
        />
      </div>
      <div class="details__right">
        <h2>{{ character?.name }}</h2>
        <p>{{ character?.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      character: {
        name: "",
        thumbnail: {
          path: "",
          extension: "",
        },
        description: "",
      },
    };
  },
  created() {
    const characterId = this.$route.params.id;

    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}`;
    const apiKey = "60645b73c441bf294a3a3a07b50bfafe";
    const hash = "2bd018a8f222867e396d936c173bb3d8";
    const params = {
      apikey: apiKey,
      hash: hash,
    };

    axios
      .get(apiUrl, { params })
      .then((response) => {
        this.character = response.data.data.results[0];
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
60645b73c441bf294a3a3a07b50bfafe
