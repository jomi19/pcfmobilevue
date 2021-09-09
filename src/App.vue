<template>
  <div class="wrap-all">
    <Header />

    <router-view />
    <Navbar />
  </div>
</template>

<style lang="scss">
@import "@/style/grid.scss";
@import "@/style/normalize.scss";
@import "@/style/main.scss";
</style>

<script>
import Header from "@/views/Header.vue";
import Navbar from "@/views/Navbar.vue";

export default {
  data() {
    return {
      projectId: null,
    };
  },
  components: {
    Header,
    Navbar,
  },
};
</script>
