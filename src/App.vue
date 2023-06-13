<template>
  <nav>
    <div class="logo">
      <img alt="Marvel" src="./assets/marvel-logo.png" />
    </div>
    <router-link to="/">Home</router-link> |
    <router-link to="/movie">Movie</router-link>
  </nav>
  <router-view />
</template>
