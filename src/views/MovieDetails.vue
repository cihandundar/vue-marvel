<template>
  <section>
    <div class="details">
      <div class="details__left">
        <img
          :src="character.thumbnail.path + '.' + character.thumbnail.extension"
          :alt="character.name"
        />
      </div>
      <div class="details__right">
        <h2>{{ character.name }}</h2>
        <p>{{ character.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    character() {
      return this.$store.state.character;
    },
  },
  created() {
    const characterId = this.$route.params.id;
    this.$store.dispatch("fetchCharacter", characterId);
  },
};
</script>
