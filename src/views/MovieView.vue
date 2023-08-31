<template>
  <main>
    <section>
      <div class="search-box">
        <input
          v-model="searchTerm"
          @keyup.enter="searchCharacter"
          placeholder="Enter name"
        />
        <button @click="searchCharacter">Search</button>
      </div>
      <ul class="card">
        <li v-if="isLoading" class="loading-message">Loading...</li>
        <li class="card__wrapper" v-else v-for="item in items" :key="item.id">
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
      searchTerm: this.$route.query.searchTerm || "",
      isLoading: false,
    };
  },

  watch: {
    $route(to, from) {
      this.searchTerm = to.query.searchTerm || "";
      if (to.query.searchTerm) {
        this.fetchSearchResults();
      } else {
        this.fetchAllCharacters();
      }
    },
  },

  created: function () {
    if (this.searchTerm) {
      this.fetchSearchResults();
    } else {
      this.fetchAllCharacters();
    }
  },

  methods: {
    fetchAllCharacters() {
      this.isLoading = true;
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=60645b73c441bf294a3a3a07b50bfafe&hash=3eec11f4ea14251a0a755a2ff02104b8`
        )
        .then((response) => {
          this.items = response.data.data.results;
        })
        .catch((error) => {
          console.error("An error occurred while fetching characters:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchSearchResults() {
      this.isLoading = true;
      axios
        .get(`https://gateway.marvel.com/v1/public/characters`, {
          params: {
            ts: 1,
            apikey: "60645b73c441bf294a3a3a07b50bfafe",
            hash: "3eec11f4ea14251a0a755a2ff02104b8",
            nameStartsWith: this.searchTerm,
          },
        })
        .then((response) => {
          this.items = response.data.data.results;
          if (this.items.length === 0) {
            alert("The character you're looking for couldn't be found.");
          }
        })
        .catch((error) => {
          console.error("An error occurred while searching:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    searchCharacter() {
      if (this.searchTerm.trim() === "") {
        this.$router.push({ path: this.$route.path });
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { searchTerm: this.searchTerm },
        });
      }
    },
  },
};
</script>
