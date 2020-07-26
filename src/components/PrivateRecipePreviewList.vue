<template>
  <b-container>
    <h3 v-if="this.title.length > 1">
      {{ title }}:
      <slot></slot>
    </h3>

    <b-row v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" id="RecipePreview" />
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      default: ""
      // required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    /**
     * Our`s
     */
    async updateRecipes() {
      try {
        // debugger
        const response = await this.axios.get(
          "https://assigment3-2-roman.herokuapp.com/profile/get_favorite",
          {
            withCredentials: true,
            username: this.$root.store.username
          }
        );

        // console.log(response);
        const recipes = response.data;
        // console.log(recipes)
        const temp = [];
        for (var key in recipes) {
          temp.push([key, recipes[key]]);
        }
        // console.log(temp)
        const temp2 = temp.map(function(o) {
          return o[1];
        });
        // console.log(temp2)
        this.recipes = [];
        this.recipes.push(...temp2);
      } catch (error) {
        console.log(error);
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  },
  created: function() {
    this.$parent.$on("updateRecipes", this.updateRecipes);
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
#RecipePreview {
  margin-bottom: 10px;
}
</style>
