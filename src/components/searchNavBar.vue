<template>
  <div>
    <div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter recipe name"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="query"
        />
      </div>
      <hr />
      <div id="chose_params">
        <b-form-select id="SelectFromList" v-model="cusisines_type" :options="Cuisines"></b-form-select>
        <b-form-select id="SelectFromList" v-model="diet_type" :options="Diet"></b-form-select>
        <b-form-select id="SelectFromList" v-model="intolerance_type" :options="Intolerances"></b-form-select>
        <b-form-select
          id="SelectFromList"
          v-model="selected_number_of_recipes"
          :options="options_number_of_recipes"
        ></b-form-select>
      </div>
    </div>
    <div style="text-align: center;">
      <br />
      <b-button id="search_btn" v-on:click="searchItems">Search</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Cuisines: Array,
    Diet: Array,
    Intolerances: Array,
    results: Array
  },
  data() {
    return {
      myCuisines: this.Cuisines,
      myDiet: this.Diet,
      myIntolerance: this.Intolerances,
      cusisines_type: null,
      diet_type: null,
      intolerance_type: null,
      searchResults: this.results,
      query: "",
      selected_number_of_recipes: 5,
      options_number_of_recipes: [
        { value: "5", text: "Results" },
        { value: "5", text: "5" },
        { value: "10", text: "10" },
        { value: "15", text: "15" }
      ]
    };
  },
  methods: {
    searchItems() {
      // console.log([
      //   this.selected_number_of_recipes,
      //   this.query,
      //   this.intolerance_type
      // ]);
      this.$emit("search-recipes", [
        this.selected_number_of_recipes,
        this.query,
        this.intolerance_type,
        this.diet_type,
        this.intolerance_type
      ]);
      this.selected_number_of_recipes = 5;
    }
  }
};
</script>

<style lang="scss" scoped>

#SelectFromList {
  width: auto;
  margin-left: 10px;
  margin-right: 10px;
}
// #Intolerance_choose{
//   width: auto;
// }
#chose_params {
  margin: auto;
  text-align: center;
}

#search_btn{
  font-size: 20px;
  width: 30%;
}

</style>
