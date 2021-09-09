<template>
  <header class="header">
    <select
      name=""
      id=""
      class="select"
      v-model="$parent.projectId"
      v-on:change="changeHandler"
    >
      <option :value="null">Välj Projekt</option>
      <option
        v-for="project in projectList"
        :key="project.id"
        :value="project.id"
      >
        {{ project.projectName
        }}<span class="small cursive">({{ project.costumer }})</span>
      </option>
    </select>
  </header>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/config.json";

export default {
  name: "Header",

  data() {
    return {
      projectList: null,
      update: false,
    };
  },
  methods: {
    changeHandler: function () {
      //Go back to list page if you are on a New page when you change project
      if (this.$route.name.startsWith("New")) {
        const routName = this.$route.name.replace("New ", "");
        this.$router.push({ name: routName });
      }
      this.update = !this.update;
    },
  },

  mounted() {
    axios.get(`${API_URL}project/all`).then((respons) => {
      this.projectList = respons.data.data;
    });
  },
};
</script>

<style lang="scss">
@import "@/style/variables.scss";
.header {
  background-image: linear-gradient($navBarDark, $navBar);
  text-align: center;
  color: white;
  font-size: 1em;
}

.select {
  background-color: transparent;
  border: 0px;
  color: white;
  text-align: center;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;

  &:focus {
    border: none;
  }
}

option {
  color: black;
}

.small {
  font-size: 0.5em;
}
</style>
