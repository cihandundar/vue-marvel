<template>
  <main>
    <section>
      <ul class="card">
        <li class="card__wrapper" v-for="item in items" :key="item.id">
          <router-link :to="{ name: `moviedetails`, params: { id: item.id } }">
            <div class="card__img">
              <img
                :src="item.thumbnail.path + '.' + item.thumbnail.extension"
                alt="Character Image"
              />
            </div>
            <div class="card__title">
              <h4>{{ item.name }}</h4>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "MovieItem",

  data() {
    return {
      items: [],
    };
  },

  created: function () {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=60645b73c441bf294a3a3a07b50bfafe&hash=3eec11f4ea14251a0a755a2ff02104b8`
      )
      .then((response) => (this.items = response.data.data.results));
  },
};
</script>

<style></style>
