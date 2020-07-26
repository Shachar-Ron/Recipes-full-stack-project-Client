<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
      <br />
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
    },
    isLastSeen: {
      type: Boolean,
      required: true
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
    async updateRecipes() {
      let response = undefined;
      if (this.isLastSeen) {
        try {
          response = await this.axios.get(
            "https://assigment3-2-roman.herokuapp.com/profile/get_last_seen_rec",
            // {
            //   username: this.$root.store.username
            // },
            {
              withCredentials: true,
              username: this.$root.store.username
            }
          );
          const recipes = response.data;

          this.recipes = [];
          this.recipes.push(...recipes);

        } catch (error) {
          console.log(error);
          if (this.$root.store.username) {
            this.$root.store.logout();
            this.$router.push("/").catch(() => {
              this.$forceUpdate();
            });
          }
        }
      } else {
        try {
          const response = await this.axios.get(
            "https://assigment3-2-roman.herokuapp.com/recipes/get_3_random_recipes"
          );
          const recipes = response.data;
          const temp = [];
          for (var key in recipes) {
            temp.push([key, recipes[key]]);
          }
          const temp2 = temp.map(function(o) {
            return o[1];
          });
          this.recipes = [];
          this.recipes.push(...temp2);
        } catch (error) {
          console.log(error);
        }
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
</style>
