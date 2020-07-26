<template>
  <div>
    <img v-if="!this.$root.store.username"
      src="../assets/FoodPreviewIcon/eye_empty.png"
      alt="Eye_empty"
      id="Eye_empty"
    />
    <img v-else-if="this.$root.store.username && !(ifViewed)"
      src="../assets/FoodPreviewIcon/eye_empty.png"
      alt="Eye_empty"
      id="Eye_empty"
    />
    <img v-else=""
      src="../assets/FoodPreviewIcon/eye_full.png"
      alt="Eye_full"
      id="Eye_full"
    />
  </div>
</template>

<script>
export default {
  props: {
    recipe_id: {
      type: Number,
      // required: true
    }
  },
  data() {
    return {
      viewed_recipes: []
    };
  },
  mounted() {
    if(this.$root.store.username)
    {
      this.getViewedRecipes();
    }
  },
  methods: {
    async getViewedRecipes() {
      try {
        const response = await this.axios.get(
          "https://assigment3-2-roman.herokuapp.com/profile/get_viewed",
          { 
            withCredentials: true,
            username: this.$root.store.username
          }
        );
        const viewed_recipes = response.data;
        this.viewed_recipes = [];
        this.viewed_recipes.push(...viewed_recipes);
      } catch (error) {
        console.log(error);
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    changeViewed(){
      let found = this.viewed_recipes.includes(this.recipe_id.toString());
      if(found)
      {
        return true;
      }
      else if(!found)
      {
        return false;
      }
      else
      {
        console.log("problem");
        return false;
      }
    }
  },
  computed:{
    ifViewed(){
      return this.changeViewed();
    }
  }
};
</script>

<style>
/* #Eye_empty{
  padding-bottom: 5px;
} */
</style>