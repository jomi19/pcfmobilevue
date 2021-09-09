<template>
  <div class="main-content">
    <div
      class="grid"
      v-for="(item, index) in checkBoxes"
      :key="index"
      v-on:click="checkHandler($event, index)"
    >
      <input
        type="checkbox"
        :id="item.index"
        class="checkbox"
        v-model="checkBoxes[index].checked"
      />
      <label
        :for="index"
        :class="checkBoxes[index].checked ? 'green' : 'red'"
        >{{ item.text }}</label
      >
    </div>
    <button :disabled="disabled" class="button" v-on:click="submitHandler">
      Gjut
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.checkbox {
  height: 1em;
  width: 1em;
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  justify-self: start;

  &:checked {
    color: red;
  }
}

label {
  grid-column-start: 2;
  grid-column-end: 3;
  font-size: 0.8em;
  user-select: none;
}

.grid {
  display: grid;

  grid-column-gap: 0.5em;
  margin-bottom: 2em;
}

.green {
  color: green;
  text-decoration: underline;
}
@media screen and (max-width: 600px) {
  button {
    width: 100%;
  }
}
</style>

<script>
import axios from "axios";
import { API_URL } from "@/config.json";

export default {
  data() {
    return {
      disabled: true,
      checkBoxes: [
        { text: "Formen rengjord och oljad", checked: false },
        { text: "Armeringen har rätt täckskikt", checked: false },
        { text: "Ingjutningsgods har rätt placering", checked: false },
        { text: "Kontroll mätt form och vinklar", checked: false },
      ],
    };
  },
  methods: {
    checkHandler: function (event, id) {
      //Makes so you can check the checkbox by clicking the label text
      if (event.target.type != "checkbox") {
        this.checkBoxes[id].checked = !this.checkBoxes[id].checked;
      }
      //Checks so all checkboxes are checked from this.Checkboxes activates button if not
      if (
        this.checkBoxes.every((check) => {
          return check.checked;
        })
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    submitHandler: function () {
      axios
        .put(`${API_URL}wall/mold`, {
          walls: [this.$route.params.id],
        })
        .then(() => {
          this.$router.push("/");
        });
    },
  },
  components: {},
};
</script>
