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
              <v-img v-if="game.background_image" max-width="100%" max-height="300px" position="top" class="mb-5" :src="game.background_image" />
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
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        loaded: false,
        games: null,
      }
    },
    computed: {
      ...mapGetters([
        'getGames',
      ]),
    },
    mounted () {
      this.games = this.getGames
      this.loaded = true
    },
  }
</script>
