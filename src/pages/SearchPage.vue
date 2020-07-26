<template>
  <div class="container">
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template v-slot:header>Search Recipes</template>
        <template v-slot:lead>Search recipes by name of the recipe or the name of the food.</template>

        <div class="s_pos">
          <searchNavBar
            v-on:search-recipes="updateResults"
            :Cuisines="this.Cuisines"
            :Diet="this.Diet"
            :Intolerances="this.Intolerances"
            :results="results"
          ></searchNavBar>
          <hr class="my-4" />
          <b-row>
            <div>
              <b-dropdown text="Sort By" class="m-2">
                <b-dropdown-item v-on:click="sortByTime">Preparation time (low to high)</b-dropdown-item>
                <b-dropdown-item v-on:click="sortByTime1">Preparation time (high to low)</b-dropdown-item>
                <b-dropdown-item v-on:click="sortByRating">Rating</b-dropdown-item>
              </b-dropdown>
            </div>
          </b-row>
        </div>
      </b-jumbotron>
    </div>
    <div id="result_main_div" v-if="this.showLastSearch">
        <h3 id="titles"><u>Last Search:</u></h3>
        <div v-for="r in (JSON.parse(this.$root.store.lastSearch))" :key="r.id" id="results1">
          <RecipePreview class="recipePreview" :recipe="r" />
        </div>
      </div>
    <div id="result_main_div" v-else>
      <h3 id="titles"><u>Results:</u></h3>
      <div v-if="!(Array.isArray(this.results) && this.results.length)" id="titles">No Results &#128534; </div>
      <div v-else v-for="r in this.results" :key="r.id" id="results1">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import searchNavBar from "../components/searchNavBar.vue";
import Cuisines from "../assets/Cuisines";
import Diet from "../assets/Diet";
import Intolerances from "../assets/Intolerances";

export default {
  components: {
    searchNavBar,
    RecipePreview
  },
  data() {
    return {
      Cuisines: [],
      Diet: [],
      Intolerances: [],
      search_params: "",
      results: [],
      showLastSearch: false
    };
  },
  created: function() {
    console.log("mounted" + this.numberOfRrsults);
  },
  mounted() {
    this.Cuisines.push(...Cuisines);
    this.Diet.push(...Diet);
    this.Intolerances.push(...Intolerances);
    if(this.$root.store.lastSearch)
    {

      this.showLastSearch = true;
    }
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

        const recipes = response.data;
        this.results = [];
        const temp = [];
        for (var key in recipes) {
          temp.push([key, recipes[key]]);
        }
        const temp2 = temp.map(function(o) {
          return o[1];
        });
        this.results.push(...temp2);
        if(this.$root.store.username)
        {
          this.$root.store.search(this.results);
        }
        this.showLastSearch = false;
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
    },
    sortByTime1() {
      this.results = this.results.sort(function(a, b) {
        if (a.readyInMinutes < b.readyInMinutes) return 1;
        else if (a.readyInMinutes > b.readyInMinutes) return -1;
        else {
          return 0;
        }
      });
    }
  }
};
</script>

<style>
.container{
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
}
.s_pos {
  margin-top: 20px;
  
}

#results1 {
  /* display: inline-block; */
  margin-block-end: 10px;
}
#result_main_div {
  margin: auto;
  width: 50%;
  padding: 10px;
  height: 500px;
  overflow: auto;
  /* color: whitesmoke; */
}
#result_main_div #titles{
  color: whitesmoke;
}
</style>