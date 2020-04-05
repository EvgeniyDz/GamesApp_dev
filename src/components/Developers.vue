<template>
  <v-content>
    <v-progress-circular
      v-if="!loaded"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-container
      v-else
      class="fill-height"
      fluid
    >
      <v-form @submit.prevent="getDevelopers">
        <v-row align="center">
          <v-col cols="8">
            <v-text-field
              v-model="searchVal"
              label="Search developers"
              clearable
            />
          </v-col>
          <v-col cols="4">
            <v-btn
              color="success"
              class="mr-4"
              @click="getDevelopers"
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row
        align="stretch"
        justify="center"
      >
        <v-col
          v-for="developer in developers"
          :key="developer.id"
          cols="12"
          sm="6"
        >
          <v-card
            class="mx-auto"
            height="100%"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{ developer.name }}
              </p>
              <v-img v-if="developer.image_background" max-width="100%" class="mb-5" :src="developer.image_background" />
              <p>Games prodused: {{ developer.games_count }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click.stop="redirectToGame(developer.id)"
              >
                Show Games
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
export default {
  data: () => ({
    developers: null,
    page: 1,
    count: null,
    searchVal: null,
    loaded: false
  }),
  watch: {
    page () {
      this.getDevelopers()
    },
    searchVal () {
      if (this.searchVal === null) this.getDevelopers()
    }
  },
  mounted () {
    this.getDevelopers()
  },
  methods: {
    getDevelopers () {
      this.$http.get('https://rawg-video-games-database.p.rapidapi.com/developers', {
        params: {
          page: this.page,
          page_size: 20,
          search: this.searchVal
        }
      })
        .then((response) => {
          this.developers = response.data.results
          this.count = response.data.count
          this.loaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    redirectToGame (id) {
      this.$router.push({ name: 'games', params: { id: id } })
    }
  }
}
</script>
