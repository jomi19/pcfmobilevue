<template>
  <div class="main-content" v-if="$parent.projectId">
    <form class="grid" v-on:submit="submitHandler">
      <label for="" class="requierd">Längd</label>
      <input
        type="number"
        name=""
        id=""
        requierd
        :placeholder="wall.length"
        v-model="controll.length"
      />

      <label for="" class="requierd">Bredd</label>
      <input
        type="number"
        name=""
        id=""
        requierd
        :placeholder="wall.height"
        v-model="controll.width"
      />

      <label for="" class="requierd">Höjd</label>
      <input
        type="number"
        name=""
        id=""
        requierd
        :placeholder="wall.width"
        v-model="controll.height"
      />

      <label for="" class="requierd">Kryssmätning</label>
      <input
        type="number"
        name=""
        id=""
        requierd
        v-model="controll.crossMessure"
      />

      <label for="">Ursparingar</label>
      <input type="text" name="" id="" v-model="controll.ursparningar" />

      <label for="" class="requierd">Lyft</label>
      <select name="" id="" requierd v-model="controll.lifts">
        <option value=""></option>
        <option value="Ok">Ok</option>
        <option value="Hänger snett">Hänger snett</option>
        <option value="Saknas">Saknas</option>
        <option value="Skadad">Skadad</option>
      </select>

      <label for="">Inghutningsgods</label>
      <input type="text" name="" id="" v-model="controll.castings" />

      <label for="" class="requierd">Ytstruktur <span></span></label>
      <select name="" id="" requierd v-model="controll.surface">
        <option value=""></option>
        <option value="Ok">Ok</option>
        <option value="Mindre bubblor">Mindre bubblor</option>
        <option value="Bubblor">Bubblor</option>
      </select>

      <label for="">Övrigt</label>
      <textarea class="textarea" v-model="controll.comments"> </textarea>
      <button
        type="submit"
        class="button"
        :disabled="!checkRequierd() ? true : false"
      >
        Skicka
      </button>
    </form>
  </div>
  <div class="main-content no-project" v-else>
    <span class="middle"> Välj ett projekt</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/variables.scss";
label {
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: end;
  margin-right: 0.5em;
  font-size: 0.7em;
}
.textarea {
  resize: none;
  grid-column-start: 2;
  grid-column-end: 3;
}

input {
  grid-column-start: 2;
  grid-column-end: 3;
  padding: 0.3em;
}

.grid {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 0.5em;
  grid-row-gap: 1em;
  margin-bottom: 2em;
}

.button {
  grid-column-start: 1;
  grid-column-end: 3;
}

.requierd {
  position: relative;
}

.requierd::after {
  position: absolute;
  content: "*";
  right: -15px;
  color: grey;
  font-size: 0.7em;
}
@media screen and (max-width: 560px) {
  input,
  label,
  .textarea,
  select {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  label {
    text-align: start;
  }
  .requierd::after {
    left: -15px;
  }
}
</style>

<script>
import { API_URL } from "@/config.json";
import axios from "axios";

export default {
  data() {
    return {
      wall: {},
      controll: null,
      submit: false,
    };
  },
  components: {},
  methods: {
    checkRequierd: function () {
      if (!this.controll.length) return false;
      if (!this.controll.height) return false;
      if (!this.controll.width) return false;
      if (!this.controll.crossMessure) return false;
      if (!this.controll.lifts) return false;
      if (!this.controll.surface) return false;
      return true;
    },
    submitHandler: function (event) {
      event.preventDefault();
      this.submit = true;
      if (this.checkRequierd()) {
        axios
          .post(`${API_URL}followup/`, this.controll)
          .then(() => {
            this.$router.push("/");
          })
          .cath(() => {
            console.log("ERROR");
          });

        console.log(this.controll);
      }
    },
  },
  beforeMount() {
    axios
      .get(`${API_URL}wall/`, {
        params: {
          id: this.$route.params.id,
        },
      })
      .then((respons) => {
        this.controll = {};
        (this.wall.height = respons.data.data.height),
          (this.wall.width = respons.data.data.width),
          (this.wall.length = respons.data.data.length);
        this.controll.id = this.$route.params.id;
      });
  },
  destroyed() {
    this.controll = null;
    this.wall = null;
    this.submit = null;
  },
};
</script>
