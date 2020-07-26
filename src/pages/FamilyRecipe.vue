

<template>
  <!-- <carousel-3d :controls-visible="true" :height="1400" :width="1250" :border="3" :perspective="50" :scaling="700"> -->

  <carousel-3d v-if="this.mounted1" :controls-visible="true" :height="1000" :width="700" id="caro" :key="componentKey">
    <!-- <slide v-for="(recipes, i) in recipes" v-bind:key="recipes.id" v-bind:title="recipes.title" :index="i"> -->
    <slide v-for="(recipes, i) in recipes" v-bind:key="recipes.id" :index="i" >
      <FamilyRecipePreview class="familyRecipePreview" :recipe="recipes" />
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
// import { Carousel3d} from "vue-carousel-3d";
import FamilyRecipePreview from "../components/FamilyRecipePreview";
export default {
  components: {
    FamilyRecipePreview,
    Carousel3d,
    Slide
  },
  data() {
    return {
      search_params: "",
      recipes: [],
      mounted1: false,
      componentKey: 0,
    };
  },
  mounted() {
    this.updateResults();
    this.mounted1 = true;
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    async updateResults() {
      try {
        const response = await this.axios.get(
          "https://assigment3-2-roman.herokuapp.com/profile/get_family_recipes",
          {
            withCredentials: true,
            username: this.$root.store.username
          }
        );
        // console.log("response");
        // console.log(response);
        const recipes = response.data;
        // console.log("recipes");
        // console.log(recipes);
        this.recipes = [];
        const temp = [];
        for (var key in recipes) {
          temp.push([key, recipes[key]]);
        }
        // console.log("temp");
        // console.log(temp);
        const temp2 = temp.map(function(o) {
          return o[1];
        });
        // console.log("temp2");
        // console.log(temp2);

        temp2[0].instructions = temp2[0].instructions.split(".");
        temp2[1].instructions = temp2[1].instructions.split(".");
        temp2[2].instructions = temp2[2].instructions.split(".");

        temp2[0].ingredients = temp2[0].ingredients.split(".");
        temp2[1].ingredients = temp2[1].ingredients.split(".");
        temp2[2].ingredients = temp2[2].ingredients.split(".");

        // console.log( temp2[0].ingredients)
        this.recipes = [];
        this.recipes.push(...temp2);
        let a = 1;
        this.forceRerender();
      } catch (error) {
        console.log(error);
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>

<style>
.s_pos {
  margin-top: 20px;
}

#caro {
  font-size: 10.6px;
}
</style>