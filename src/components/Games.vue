<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row align="center">
        <v-col class="d-flex pb-0" cols="12">
          <p class="display-1 text--primary mb-0">
            Filters:
          </p>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-form style="width: 100%" @submit.prevent="getGames()">
            <v-row align="center">
              <v-col cols="8">
                <v-text-field
                  v-model="searchVal"
                  label="Search game"
                  clearable
                />
              </v-col>
              <v-col cols="4" class="text-right">
                <v-btn
                  color="success"
                  class="mr-4"
                  @click="getGames()"
                >
                  Search
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="filters.genres"
            :items="genres"
            label="Genres"
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="filters.platforms"
            :items="platforms"
            item-text="name"
            item-value="id"
            label="Platforms"
            :placeholder="defPlatform"
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="filters.publishers"
            :items="publishers"
            item-text="name"
            item-value="id"
            label="Publishers"
            :placeholder="defPublishers"
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="filters.stores"
            :items="stores"
            item-text="name"
            item-value="id"
            label="Stores"
            :placeholder="defStores"
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-btn
            text
            color="red darken-3"
            @click="filtersReset()"
          >
            Reset filters
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        align="stretch"
        justify="center"
      >
        <v-progress-circular
          v-if="!loaded"
          indeterminate
          color="primary"
        />
        <v-col class="d-flex pb-0" cols="12">
          <p class="display-1 text--primary mb-0">
            Games:
          </p>
        </v-col>
        <v-col cols="12">
          <v-row
            align="stretch"
          >
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                v-model="sorted"
                :items="sort_items"
                label="Sorted By"
              />
            </v-col>
          </v-row>
        </v-col>
        <p v-if="games && games.length === 0">
          Games list is empty
        </p>
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
                @click="openModal(game.id)"
              >
                Show More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-if="games && games.length > 0"
        v-model="page"
        :length="Math.trunc(count/20)"
        :total-visible="7"
      />
    </v-container>
    <v-dialog v-model="dialog"
              max-width="600"
    >
      <game-modal :game="game" />
    </v-dialog>
  </v-content>
</template>

<script>
  import GameModal from './GameModal'
  export default {
    components: {
      GameModal,
    },
    data: () => ({
      games: null,
      page: 1,
      loaded: false,
      count: null,
      dialog: false,
      game: null,
      genres: [],
      platforms: [],
      publishers: [],
      stores: [],
      filters: {
        genres: null,
        platforms: null,
        publishers: null,
        stores: null,
      },
      searchVal: null,
      sort_items: ['name', 'released', 'added', 'created', 'rating'],
      sorted: null,
    }),
    computed: {
      defPlatform () {
        return this.$route.query.platforms ? this.platforms.filter(item => item.id === parseInt(this.$route.query.platforms))[0]?.name : ''
      },
      defPublishers () {
        return this.$route.query.publishers ? this.publishers.filter(item => item.id === parseInt(this.$route.query.publishers))[0]?.name : ''
      },
      defStores () {
        return this.$route.query.stores ? this.stores.filter(item => item.id === parseInt(this.$route.query.stores))[0]?.name : ''
      },
    },
    watch: {
      page () {
        this.getGames()
      },
      filters: {
        deep: true,
        handler () {
          this.getGames()
          this.$router.push({
            name: 'games',
            query: {
              ...this.$route.query,
              ...(this.filters.genres ? { genres: this.filters.genres } : ''),
              ...(this.filters.platforms ? { platforms: this.filters.platforms } : ''),
              ...(this.filters.publishers ? { publishers: this.filters.publishers } : ''),
              ...(this.filters.stores ? { stores: this.filters.stores } : ''),
            },
          }, () => {})
        },
      },
      searchVal () {
        if (this.searchVal === null) this.getGames()
        this.$router.push({
          name: 'games',
          query: {
            ...this.$route.query,
            search: this.searchVal,
          },
        }, () => {})
      },
      sorted () {
        this.getGames()
        this.$router.push({
          name: 'games',
          query: {
            ...this.$route.query,
            sorted: this.sorted,
          },
        }, () => {})
      },
    },
    mounted () {
      this.getGenres()
      this.getPlatforms()
      this.getPublishers()
      this.getStores()
      this.filters = {
        genres: this.$route.query.genres ? this.$route.query.genres : null,
        platforms: this.$route.query.platforms ? this.$route.query.platforms : null,
        publishers: this.$route.query.publishers ? this.$route.query.publishers : null,
        stores: this.$route.query.stores ? this.$route.query.stores : null,
      }
      this.searchVal = this.$route.query.search ? this.$route.query.search : null
      this.getGames()
    },
    methods: {
      getGames () {
        this.$http.get('https://rawg-video-games-database.p.rapidapi.com/games', {
          params: {
            search: this.searchVal,
            ordering: this.sorted,
            developers: this.$route.params.id,
            page: this.page,
            page_size: 10,
            ...(this.filters.genres ? { genres: this.filters.genres } : {}),
            ...(this.filters.platforms ? { platforms: this.filters.platforms } : {}),
            ...(this.filters.publishers ? { publishers: this.filters.publishers } : {}),
            ...(this.filters.stores ? { stores: this.filters.stores } : {}),
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
      getGenres () {
        this.$http.get('https://rawg-video-games-database.p.rapidapi.com/genres')
          .then((response) => {
            response.data.results.map(item => this.genres.push(item.slug))
          })
          .catch((error) => {
            console.log(error)
          })
      },
      getPlatforms () {
        this.$http.get('https://rawg-video-games-database.p.rapidapi.com/platforms')
          .then((response) => {
            response.data.results.map(item => this.platforms.push(item))
          })
          .catch((error) => {
            console.log(error)
          })
      },
      getPublishers () {
        this.$http.get('https://rawg-video-games-database.p.rapidapi.com/publishers')
          .then((response) => {
            response.data.results.map(item => this.publishers.push(item))
          })
          .catch((error) => {
            console.log(error)
          })
      },
      getStores () {
        this.$http.get('https://rawg-video-games-database.p.rapidapi.com/stores')
          .then((response) => {
            response.data.results.map(item => this.stores.push(item))
          })
          .catch((error) => {
            console.log(error)
          })
      },
      openModal (id) {
        this.game = this.games.filter(item => item.id === id)[0]
        this.dialog = true
      },
      filtersReset () {
        this.filters = {
          genres: null,
          platforms: null,
          publishers: null,
          stores: null,
        }
        this.$router.push({
          name: 'games',
          query: {
            ...(this.sorted ? { sorted: this.sorted } : ''),
          },
        }, () => {})
      },
    },
  }
</script>
