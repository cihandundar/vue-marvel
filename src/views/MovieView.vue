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
      searchTerm: "", // Kullanıcının girdiği arama terimi için veri alanı eklendi
    };
  },

  created: function () {
    // Sayfa yüklendiğinde tüm karakterleri getiren işlem aynen kalır
    this.fetchAllCharacters();
  },

  methods: {
    fetchAllCharacters() {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=60645b73c441bf294a3a3a07b50bfafe&hash=3eec11f4ea14251a0a755a2ff02104b8`
        )
        .then((response) => {
          this.items = response.data.data.results;
        })
        .catch((error) => {
          console.error("Karakterler alınırken bir hata oluştu:", error);
        });
    },

    searchCharacter() {
      if (this.searchTerm.trim() === "") {
        // Boş arama yapılamaz, tüm karakterleri göstermek için yeniden istem yapılır
        this.fetchAllCharacters();
        return;
      }

      axios
        .get(`https://gateway.marvel.com/v1/public/characters`, {
          params: {
            ts: 1,
            apikey: "60645b73c441bf294a3a3a07b50bfafe",
            hash: "3eec11f4ea14251a0a755a2ff02104b8",
            nameStartsWith: this.searchTerm, // Kullanıcının girdiği terimle başlayan karakterleri getir
          },
        })
        .then((response) => {
          this.items = response.data.data.results;
          if (this.items.length === 0) {
            alert("Aradığınız karakter bulunamadı.");
          }
        })
        .catch((error) => {
          console.error("Arama sırasında bir hata oluştu:", error);
        });
    },
  },
};
</script>
