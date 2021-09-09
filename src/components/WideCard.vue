<template>
  <div class="wall-container" :id="wall.id">
    <div class="wallblock-head">{{ wall.wallName }}</div>
    <div class="wallblock-main wallgrid">
      <p class="first">
        Mått: {{ wall.length }}x{{ wall.width }}x{{ wall.height }}
      </p>
      <p v-if="wall.molded" class="last">
        Gjut datum: {{ getDate(wall.molded) }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "WideCard",
  props: {
    wall: Object,
    ship: Boolean,
  },
  data() {
    return {
      classs: false,
    };
  },
  methods: {
    getDate: function (date) {
      date = date.split("T");
      return date[0];
    },
  },
};
</script>

<style lang="scss">
@import "@/style/variables.scss";
.middle {
  position: relative;
  top: 20%;
  height: 1em;
  font-size: 2em;
}
.wall-container {
  width: 100%;
  margin-bottom: 1em;
  user-select: none;
  transition-duration: 20ms;

  &:active {
    box-shadow: none;
    transform: translateY(0) scale(0.995);
  }

  &:hover {
    cursor: pointer;
  }
}

.selected {
  color: $green1;
  box-shadow: 5px 15px 5px $green1;
  position: relative;
  transform: translateY(0) scale(0.95);
}

.wallblock-main {
  border-left: 2px solid $blue1;
  border-right: 2px solid $blue1;
  border-bottom: 2px solid $blue1;
  font-size: 0.6em;
  padding: 0.5em;
}
.wallgrid {
  display: grid;
  grid-template-columns: auto 1fr auto;
}

.last {
  grid-column-start: 3;
  grid-column-end: 4;
}

.first {
  grid-column-start: 1;
  grid-column-end: 2;
}
.wallblock-head {
  display: block;
  color: white;
  background-color: $blue1;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "\\\\\\";
    position: absolute;
    left: 5px;
    color: $blue3;
  }
  &::after {
    content: "";
    position: absolute;
    background-color: white;
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
    right: -25px;
    top: -25px;
    overflow: hidden;
  }
}
.block {
  margin-bottom: 1em;
}

@media screen and (max-width: 450px) {
  .last {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .first {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
