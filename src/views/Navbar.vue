<template>
  <div class="test">
    <nav class="navbar">
      <router-link
        class="navbutton"
        v-for="link in routes"
        :key="link.name"
        :to="link.path"
        active-class="active"
      >
        <Mold
          v-if="link.name === 'Mold'"
          class="icon"
          :size="iconSize"
          v-on:click="clickHandler"
        />
        <Controll
          v-else-if="link.name === 'Aftercheck'"
          class="icon"
          :size="iconSize"
          v-on:click="clickHandler"
        />
        <Ship class="icon" v-else :size="iconSize" v-on:click="clickHandler" />
        <div class="menu-text">{{ link.navbar }}</div>
      </router-link>
    </nav>
  </div>
</template>

<script>
import Ship from "vue-material-design-icons/Truck.vue";
import Controll from "vue-material-design-icons/ClipboardList.vue";
import Mold from "vue-material-design-icons/PlusCircle.vue";
export default {
  name: "Navbar",
  components: {
    Ship,
    Controll,
    Mold,
  },
  methods: {
    clickHandler: function () {
      this.$parent.projectId = null;
    },
  },
  data() {
    return {
      routes: this.$router.options.routes,
      iconSize: 35,
    };
  },
  mounted() {
    let navList = [];

    for (let navItem in this.routes) {
      if (this.routes[navItem].navbar) {
        navList.push(this.routes[navItem]);
      }
    }
    this.width = `width: ${100 / navList.length}%;`;
    this.routes = navList;
    console.log(this.routes[0].path);
  },
};
</script>

<style lang="scss">
@import "@/style/variables.scss";

nav {
  background-image: linear-gradient($navBar, $navBarDark);
  display: flex;
  justify-content: space-around;
  align-content: center;
  text-align: center;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.navbutton {
  color: white;
  display: block;
  margin-bottom: 0.2em;
  margin-top: 0.2em;
  text-decoration: none;
}

.active {
  color: darken(white, 30%);
}
.menu-text {
  font-size: 0.5rem;
}
</style>
