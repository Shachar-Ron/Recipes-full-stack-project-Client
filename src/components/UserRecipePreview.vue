<template>
  <!-- If You Click On Image go to recipe page -->
<b-button v-b-popover.hover="'Click to see full recipe!'" :title="this.recipe.title" variant="light">  
  <router-link
    :to="{ name: 'privateRecipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div v-b-hover="handleHover">
      <b-card
        no-body
        bg-variant="light"
        style="max-width: 540px;"
        class="text-center"
        :header="recipe.title"
        :class="isHovered ? 'text-primary' : ''"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="recipe.image"
              class="recipe-image"
              id="UserRecipeImage"
              style="max-height: 200px;"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body class="recipe-title">
              <ul class="recipe-overview" id="recipe-overview">
                <li>
                  <img src="../assets/FoodPreviewIcon/time_24px.png" alt="ReadyTime" id="ReadyTime" />
                  {{ recipe.time }} minutes
                </li>
                <li v-if="ifVegetarian">
                  <img
                    src="../assets/FoodPreviewIcon/vegetarian_24.png"
                    alt="Vegeterian"
                    id="Vegeterian"
                  />
                </li>
                <li v-if="ifVegan">
                  <img src="../assets/FoodPreviewIcon/vegan_24.png" alt="Vegan" id="Vegan" />
                </li>
                <li v-if="ifGlutenFree">
                  <img
                    src="../assets/FoodPreviewIcon/gluten_24.png"
                    alt="GlutenFree"
                    id="GlutenFree"
                  />
                </li>
              </ul>
              <ul class="recipe-overview" id="recipe-overview">
                <li>
                  <img src="../assets/FoodPreviewIcon/star_24.png" alt="likes" id="likes" />
                  {{ recipe.popularity }} stars
                </li>
              </ul>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </router-link>
</b-button>
  
</template>

<script>
export default {
  methods: {
    // forceRerender() {
    //   this.componentKey += 1;
    // },
    addToFavorites: async function() {
      try {
        const response = await this.axios.post(
          "https://assigment3-2-roman.herokuapp.com/profile/set_favorite",
          {
            username: this.$root.store.username,
            rec_id: this.recipe.id
          },
          {
            withCredentials: true
          }
        );
        const recipes = response.data.message;
        // console.log(recipes);
        // this.forceRerender();
      } catch (error) {
        console.log(error);
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    }
  },
  components: {},
  data() {
    return {
      //   componentKey: 0
      isHovered: false
    };
  },
  computed: {
    ifVegetarian() {
      return this.recipe.vegetarian;
    },
    ifVegan() {
      return this.recipe.vegan;
    },
    ifGlutenFree() {
      return this.recipe.gluten;
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* #main-div-revipe-preview{
  border: 3px solid rgb(0, 0, 0);
} */
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}


.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  border: 3px solid #5552;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 14pt;
  text-align: center;
  white-space: nowrap;
  /* overflow: auto; */
  overflow: auto;
  -o-text-overflow: auto;
  text-overflow: auto;
  font-weight: bold;
}

#recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: inline-block;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  /* float: left; */
  margin-bottom: 0px;
}

#recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  font-size: 12px;
}

#RecFavoriteIconMouse {
  cursor: pointer;
  height: 42px;
  width: 42px;
}

#ReadyTime {
  padding-bottom: 5px;
}

#likes {
  padding-bottom: 4px;
}

ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
.active {
  background: green;
}
</style>

