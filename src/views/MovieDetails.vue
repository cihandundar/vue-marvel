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
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=60645b73c441bf294a3a3a07b50bfafe&hash=3eec11f4ea14251a0a755a2ff02104b8`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.character = response?.data?.data?.results[0];
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
