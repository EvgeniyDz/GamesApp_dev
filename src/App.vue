<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Games App</v-toolbar-title>
    </v-app-bar>
    <side-bar :drawer="drawer" />
    <router-view>
      <developers />
      <platforms />
    </router-view>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Developers from './components/Developers'
  import Platforms from './components/Platforms'
  import SideBar from './components/SideBar'

  export default {
    name: 'App',

    components: {
      SideBar,
      Developers,
      Platforms,
    },

    data: () => ({
      drawer: null,
    }),
  }
</script>
