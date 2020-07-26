<template>
  <div class="container">
    <!-- <h3 class="title" style=" margin-top: 40px;">Search Page</h3> -->
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template v-slot:header>Search Recipes</template>
        <template v-slot:lead>Search recipes by name of the recipe or the name of the food.</template>

        
        <div class="s_pos">
          <searchNavBar
            v-on:search-recipes="updateResults"
            :Cuisines="Cuisines"
            :Diet="Diet"
            :Intolerances="Intolerances"
            :results="results"
          ></searchNavBar>

          <hr class="my-4" />
          <b-row>
            <div>
              <b-dropdown split split-href="#foo/bar" text="Sort By" class="m-2">
                <b-dropdown-item href="#" v-on:click="sortByTime">Preparation time</b-dropdown-item>
                <b-dropdown-item href="#" v-on:click="sortByRating">Rating</b-dropdown-item>
              </b-dropdown>
            </div>
          </b-row>
        </div>
      </b-jumbotron>

      <!-- <div>
              <b-dropdown
                split
                split-variant="outline-primary"
                variant="primary"
                text="Sort By"
                class="m-2"
              >
                <b-dropdown-item href="#" v-on:click="sortByTime">Preparation time</b-dropdown-item>
                <b-dropdown-item href="#" v-on:click="sortByRating">Rating</b-dropdown-item>
              </b-dropdown>
      </div>-->
    </div>
    <div>
      <b-row v-for="r in results" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
    </div>

    <!-- <div  style="text-align: center;">
      <b-row v-for="i in results.length/2" :key="i" style="margin-top: 50px;">
        <b-col v-for="index in 2" :key="index">
              <RecipePreview class="recipePreview" :recipe="r"  />
        </b-col>
      </b-row>
    </div>-->

    <!-- <div v-if="results.length !== 1|0 " style="text-align: center;">
      <b-row v-for="i in numberOfRrsults/5" :key="i" style="margin-top: 50px;">
        <b-col v-for="index in 5" :key="index">
          <RecipePreview
            v-if="results[index+((i-1)*5)] !== undefined"
            :recipe="results[index+((i-1)*5)]"
            style="margin-right: 20px;"
          ></RecipePreview>
        </b-col>
      </b-row>
    </div>
    <div v-else style="text-align: center;">Oh no! There are no results to show 😢</div>-->
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import searchNavBar from "../components/searchNavBar.vue";
export default {
  components: { 
    searchNavBar,
    RecipePreview 
   },
  data() {
    return {
      Cuisines: [
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern",
        "European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin",
        "American",
        "Mediterranean",
        "Mexican",
        "Middle",
        "Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese"
      ],
      Diet: [
        "Gluten",
        "Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Whole30"
      ],
      Intolerances: [
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree",
        "Nut",
        "Wheat"
      ],
      search_params: "",
      results: []
    };
  },
  created: function() {
    console.log("mounted" + this.numberOfRrsults);
  },
  methods: {
    async updateResults(info) {
      try {
        const response = await this.axios.get(
          `https://assigment3-2-roman.herokuapp.com/recipes/search/query/${info[1]}/amount/${info[0]}`,
          {
            params: {
              cuisine: info[4],
              diet: info[3],
              intolerance: info[2]
            }
          }
        );

        // console.log(response);
        const recipes = response.data;
        // console.log(recipes)
        this.results = [];
        const temp = [];
        for (var key in recipes) {
          temp.push([key, recipes[key]]);
        }
        // console.log(temp)
        const temp2 = temp.map(function(o) {
          return o[1];
        });
        // console.log(temp2)
        //this.results = [];
        this.results.push(...temp2);
      } catch (error) {
        console.log(error);
      }
    },
    sortByRating() {
      this.results = this.results.sort(function(a, b) {
        if (a.aggregateLikes < b.aggregateLikes) return 1;
        else if (a.aggregateLikes > b.aggregateLikes) return -1;
        else {
          return 0;
        }
      });
    },
    sortByTime() {
      this.results = this.results.sort(function(a, b) {
        if (a.readyInMinutes < b.readyInMinutes) return -1;
        else if (a.readyInMinutes > b.readyInMinutes) return 1;
        else {
          return 0;
        }
      });
    }
  }
};
</script>

<style>
.s_pos {
  margin-top: 20px;
}
</style>