<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="stretch"
        justify="center"
      >
        <v-progress-circular
          v-if="!loaded"
          indeterminate
          color="primary"
        />
        <v-col
          v-for="game in games"
          :key="game.id"
          cols="12"
          sm="6"
        >
          <v-card
            class="mx-auto"
            height="100%"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{ game.name }}
              </p>
              <v-img v-if="game.background_image" max-width="100%" class="mb-5" :src="game.background_image" />
              <p>Rating: {{ game.rating }}</p>
              <strong>Platforms:</strong>
              <ul>
                <li v-for="platform in game.platforms" :key="platform.platform.id">
                  {{ platform.platform.name }}
                </li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
              >
                Show More
              </v-btn>
              <v-btn :color="favoritesIds.includes(game.id) ? 'blue darken-4' : 'blue lighten-4'" @click="addGameToFavorite(game)">
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        :length="Math.trunc(count/20)"
        :total-visible="7"
      />
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      games: null,
      page: 1,
      loaded: false,
      count: null,
    }),
    watch: {
      page () {
        this.getGames()
      },
    },
    computed: {
      ...mapGetters([
        'favoritesIds',
      ]),
    },
    mounted () {
      this.getGames()
    },
    methods: {
      getGames () {
        this.$http.get('https://rawg-video-games-database.p.rapidapi.com/games', {
          params: {
            developers: this.$route.params.id,
            page: this.page,
            page_size: 20,
          },
        })
          .then((response) => {
            this.games = response.data.results
            this.count = response.data.count
            this.loaded = true
          })
          .catch((error) => {
            console.log(error)
          })
      },
      ...mapActions([
        'addGameToFavorite',
      ]),
    },
  }
</script>
