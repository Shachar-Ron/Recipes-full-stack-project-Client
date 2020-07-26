<template>
  <div>
    <b-card no-body bg-variant="light" :header="this.title" id="b-card">
      <div id="main-div">
        <b-card-img
          v-if="this.image && this.image.length > 1"
          :src="this.image"
          class="recipe-image"
          alt="Image"
          id="b-card-image"
        ></b-card-img>
        <b-card-img
          v-else
          :src="this.defult_image"
          class="recipe-image"
          alt="Image"
          id="b-card-image"
        ></b-card-img>
      </div>
      <b-row id="icons">
        <b-col>
          <img
            v-if="this.recipe.glutenFree"
            src="../assets/RecipeIcons/glutenFree.png"
            alt="Favorite_empty"
            id="icon"
          />
        </b-col>
        <b-col>
          <img
            v-if="this.recipe.vegan"
            src="../assets/RecipeIcons/vegan.jpg"
            alt="Favorite_empty"
            id="icon"
          />
        </b-col>
        <b-col>
          <img
            v-if="this.recipe.vegetarian"
            src="../assets/RecipeIcons/vegetarian.png"
            alt="Favorite_empty"
            id="icon"
          />
        </b-col>
      </b-row>
      <b-card-body :title="this.title" class="recipe-title">
        <b-row>
          <b-col md="4">
            <ul class="recipe-overview" id="recipe-overview">
              <li>
                <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              </li>
              <li>
                <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              </li>
            </ul>

            <ul>
              <b>Ingredients:</b>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >{{ r.original }}</li>
            </ul>
          </b-col>
          <b-col md="8">
            <b>Instructions:</b>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">{{ s.step }}</li>
            </ol>
          </b-col>
        </b-row>
        <ul></ul>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: "",
      recipe_id: "0",
      title: "",
      image: "",
      defult_image:
        "https://www.tastefullysimple.com/_/media/images/recipe-default-image.png"
    };
  },
  beforeMount() {
    this.created();
  },

  methods: {
    async addViewed() {
      try {
        const response = await this.axios.post(
          "https://assigment3-2-roman.herokuapp.com/profile/viewed",
          {
            username: this.$root.store.username,
            rec_id: this.recipe_id
          },
          {
            withCredentials: true
          }
        );
        const message = response.data.message;
        // console.log("added to viewed");
        // console.log(message);
      } catch (error) {
        console.log(error);
      }
    },
    async addThreeLastSeen() {
      try {
        const response = await this.axios.post(
          "https://assigment3-2-roman.herokuapp.com/profile/addRecipeToWatched",
          {
            username: this.$root.store.username,
            rec_id: this.recipe_id
          },
          {
            withCredentials: true
          }
        );
        const message = response.data.message;
        // console.log("added to last seen");
        // console.log(message);
      } catch (error) {
        console.log(error);
      }
    },
    async created() {
      try {
        // debugger
        let response;
        let recID = this.$route.params.recipeId;
        try {
          response = await this.axios.get(
            "https://assigment3-2-roman.herokuapp.com/recipes/Information/Id/" +
              recID
          );

          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        let response2 = response.data[0];
        let a = 1;
        let {
          analyzedInstructions,
          instructions,
          extendedIngredients,
          aggregateLikes,
          readyInMinutes,
          image,
          title,
          glutenFree,
          vegan,
          vegetarian
        } = response2;
        // console.log("im here");
        let _instructions = analyzedInstructions
          .map(fstep => {
            fstep.steps[0].step = fstep.name + fstep.steps[0].step;
            return fstep.steps;
          })
          .reduce((a, b) => [...a, ...b], []);

        let _recipe = {
          instructions,
          _instructions,
          analyzedInstructions,
          extendedIngredients,
          aggregateLikes,
          readyInMinutes,
          image,
          title,
          glutenFree,
          vegan,
          vegetarian
        };
        this.recipe = _recipe;
        this.title = this.recipe.title;
        this.image = this.recipe.image;
        this.recipe_id = recID;
        if (this.$root.store.username) {
          this.addThreeLastSeen();
          this.addViewed();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
  font-size: 1.2em;
}
#main-div {
  width: 100%;
  text-align: center;
}
#b-card {
  width: 80%;
}
#b-card-image {
  max-width: 500px;
  padding-top: 5px;
  padding-bottom: 5px;
}
#icons {
  align-self: center;
}
#icon {
  height: 70px;
  width: 70px;
}
/* .recipe-header{

} */
</style>
