<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <p>zalupa</p>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    developers: null
  }),
  mounted () {
    this.getDevelopers()
  },
  methods: {
    getDevelopers () {
      axios.get('https://rawg-video-games-database.p.rapidapi.com/games', {
        headers: {
          'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
          'x-rapidapi-key': '0cb09984b7msh8da7946b53116b2p100409jsn2b71542652a3'
        },
        params: {
          page: 1
        }
      })
        .then((response) => {
          console.log(response)
          this.developers = response.data.results
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
