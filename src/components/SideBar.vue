<template>
  <v-navigation-drawer
    v-model="isVisible"
    app
  >
    <v-list dense two-line>
      <v-list-item link to="/">
        <v-list-item-content>
          <v-list-item-title>Developers</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/platforms">
        <v-list-item-content>
          <v-list-item-title>Platforms</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/favorite">
        <v-list-item-content>
          <v-list-item-title>
            <v-badge
              v-if="favoritesCount"
              :content="favoritesCount"
            >
              Favorites
            </v-badge>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      drawer: Boolean,
    },
    data () {
      return {
        isVisible: this.drawer,
      }
    },
    computed: {
      ...mapGetters([
        'favoritesCount',
      ]),
    },
    watch: {
      drawer () {
        this.isVisible = this.drawer
      },
    },
  }
</script>
