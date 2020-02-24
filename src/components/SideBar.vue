<template>
  <v-navigation-drawer
    v-model="isVisible"
    app
  >
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Developers</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/platforms">
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Platforms</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data () {
    return {
      isVisible: this.drawer
    }
  },
  watch: {
    drawer () {
      console.log(this)

      this.isVisible = this.drawer
    }
  }
}
</script>
