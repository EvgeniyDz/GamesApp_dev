<template>
  <v-card
    class="mx-auto"
    height="100%"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        {{ game.name }}
      </p>
      <p class="title text--primary">
        Screenshots:
      </p>
      <v-carousel
        hide-delimiter-background
        show-arrows-on-hover
        height="300"
      >
        <v-carousel-item
          v-for="screenshot in game.short_screenshots"
          :key="screenshot.id"
        >
          <v-img max-width="100%" max-height="300px" position="top" :src="screenshot.image" />
        </v-carousel-item>
      </v-carousel>
      <p class="title text--primary">
        Video:
      </p>
      <video :src="game.clip.clip" controls width="100%" />
      <p class="title text--primary">
        Deatil info:
      </p>
      <p>Rating: {{ game.rating }} Release date: {{ game.released }}</p>
      <v-row
        align="start"
        justify="space-between"
      >
        <v-col cols="12"
               sm="4"
        >
          <strong>Platforms:</strong>
          <ul>
            <li v-for="platform in game.platforms" :key="platform.platform.id">
              {{ platform.platform.name }}
            </li>
          </ul>
        </v-col>
        <v-col cols="12"
               sm="4"
        >
          <strong>Genres:</strong>
          <ul>
            <li v-for="genre in game.genres" :key="genre.id">
              {{ genre.name }}
            </li>
          </ul>
        </v-col>
        <v-col cols="12"
               sm="4"
        >
          <strong>Stores:</strong>
          <ul>
            <li v-for="store in game.stores" :key="store.store.id">
              {{ store.store.name }}
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn :color="favoritesIds.includes(game.id) ? 'blue darken-4' : 'blue lighten-4'" @click="addGameToFavorite(game)">
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    props: {
      game: Object,
    },
    computed: {
      ...mapGetters([
        'favoritesIds',
      ]),
    },
    methods: {
      ...mapActions([
        'addGameToFavorite',
      ]),
    },
  }
</script>
