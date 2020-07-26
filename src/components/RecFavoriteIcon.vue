<template>
  <div>
    <img
      v-if="!this.$root.store.username"
      src="../assets/FoodPreviewIcon/favorite_empty.png"
      alt="Favorite_empty"
      id="Favorite_empty"
    />
    <img
      v-else-if="this.$root.store.username && !(ifFavoriteStart)"
      src="../assets/FoodPreviewIcon/favorite_empty.png"
      alt="Favorite_empty"
      id="Favorite_empty"
    />
    <img
      v-else
      src="../assets/FoodPreviewIcon/favorite_full.png"
      alt="Favorite_empty"
      id="Favorite_empty"
    /> Favorite
  </div>
</template>

<script>
export default {
  props: {
    recipe_id: {
      type: Number
      // required: true
    }
  },
  data() {
    return {
      fav_recipes: []
      // favorite_icon: "../assets/FoodPreviewIcon/favorite_empty.png"
    };
  },
  mounted() {
    if (this.$root.store.username) {
      this.getFavoriteRecipes();
    }
  },
  methods: {
    async getFavoriteRecipes() {
      try {
        const response = await this.axios.get(
          "https://assigment3-2-roman.herokuapp.com/profile/get_favorite_ids",
          {
            withCredentials: true,
            username: this.$root.store.username
          }
        );
        // console.log("this.recipe_id")
        const fav_recipes = response.data;
        this.fav_recipes = [];
        this.fav_recipes.push(...fav_recipes);
      } catch (error) {
        console.log(error);
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    changeFavoriteStart() {
      // if(!this.recipe_id)
      // {
      //   return false;
      // }
      let found = this.fav_recipes.includes(this.recipe_id.toString());
      if (found) {
        // this.favorite_icon = "../assets/FoodPreviewIcon/favorite_full.png";
        // console.log("ture");
        return true;
      } else if (!found) {
        // console.log("false");
        return false;
      } else {
        console.log("problem");
        return false;
      }
    }
  },
  computed: {
    ifFavoriteStart() {
      return this.changeFavoriteStart();
    }
  }
};
</script>

<style>
#Favorite_empty {
  padding-bottom: 5px;
}
</style>