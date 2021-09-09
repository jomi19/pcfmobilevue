<template>
  <div class="main-content" v-if="walls.length < 1">Hittade inga väggar</div>
  <div class="main-content" v-else-if="$parent.projectId">
    <WideCard
      v-for="wall in walls"
      :key="wall.id"
      :wall="wall"
      v-on:click.native="clickHandler(wall.id)"
      :ship="wall.id in ship"
    />
    <button class="button" v-if="$route.name === 'Send'" v-on:click="sendWalls">
      Skicka
    </button>
  </div>
  <div class="main-content no-project" v-else>
    <span class="middle"> Välj ett projekt</span>
  </div>
</template>

<style lang="scss">
@import "@/style/variables.scss";
.no-project {
  text-align: center;
  color: $red1;
  justify-content: center;
  vertical-align: center;
}
</style>

<script>
import axios from "axios";
import { API_URL } from "@/config.json";
import WideCard from "@/components/WideCard.vue";
export default {
  data() {
    return {
      walls: {},
      lastId: "inget",
      lastPath: false,
      ship: {},
      update: false,
    };
  },
  components: {
    WideCard,
  },
  methods: {
    clickHandler: function (id) {
      if (this.$route.name === "Send") {
        let element = document.getElementById(id);
        if (id in this.ship) {
          element.classList.remove("selected");
          delete this.ship[id];
        } else {
          element.classList.add("selected");
          this.ship[id] = true;
        }
        this.update = !this.update;
      } else {
        this.$router.push({
          name: `New ${this.$route.name}`,
          params: { id: id },
        });
      }
    },
    sendWalls: function () {
      if (Object.keys(this.ship).length > 0) {
        const wallsToSend = Object.keys(this.ship);
        axios
          .put(`${API_URL}wall/ship`, {
            walls: wallsToSend,
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            console.log("Error");
          });
      }
    },
  },
  updated() {
    let apiPath = "wall/unmolded";
    if (this.$route.name === "Aftercheck") {
      apiPath = "followup/ready";
    }
    if (this.$route.name === "Send") {
      apiPath = "wall/ship";
    }
    if (this.$route.name != this.lastPath) {
      this.lastId = false;
    }
    this.lastPath = this.$route.name;

    if (
      (this.$parent.projectId != this.lastId) &
      (this.$parent.projectId != null)
    ) {
      axios
        .get(`${API_URL}${apiPath}`, {
          params: {
            id: this.$parent.projectId,
          },
        })
        .then((respons) => {
          this.walls = respons.data.data;
          this.lastId = this.$parent.projectId;
        })
        .catch(() => {
          console.log("error");
          this.walls = {};
          this.lastId = this.$parent.projectId;
        });
    }
  },
  destroyed() {
    this.lastId = false;
  },
};
</script>
