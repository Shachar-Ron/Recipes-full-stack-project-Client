<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Randome Recipes:</h2>
        <!-- <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" /> -->

        <RecipePreviewList class="RandomRecipes center" :isLastSeen="false" />
        <!-- <br /> -->

        
      </b-col>
      <b-col>
        <div v-if="!$root.store.username" align="center" >
          <Login></Login>
        </div>
        <h2 v-if="this.$root.store.username" >Last Seen:</h2>
        <RecipePreviewList v-if="this.$root.store.username" :isLastSeen="true" id="RecipePreviewList1" class="RandomRecipes center" ></RecipePreviewList>
        <!-- <Login v-if="!$root.store.username" routeTo="/login"></Login> -->
      </b-col>
    </b-row>
    <b-row id="btn-row"><button type="button" class="btn btn-info" @click="NewRandomRecipes" id="random-btn">Randon new recipes</button></b-row>
  </div>
</template>

<script>
import Login from "../components/Login";
import RecipePreviewList from "../components/RecipePreviewList";
// import UserRecipePreviewList from "../components/UserRecipePreviewList";
export default {
  components: {
    RecipePreviewList,
    Login
    // UserRecipePreviewList
  },
  methods: {
    NewRandomRecipes() {
      this.$emit("updateRecipes");
    }
  }
};
</script>


<style >
html {
  background: linear-gradient(45deg, #17ead9, #6078ea);
  height: 100vh;
  margin: 0;
  background-attachment: fixed;
  
}
</style>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
// ::v-deep .blur .recipe-preview {
//   pointer-events: none;
//   cursor: default;
// }
.container .row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 62px;
  font-weight: 800;
  line-height: 72px;
  margin: 0 0 24px;
  text-align: center;
  text-transform: uppercase;
}
h2 {
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 30px;
  font-weight: 800;
  line-height: 36px;
  margin: 0 0 24px;
  text-align: center;
}
h5 {
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 30px;
  font-weight: 800;
  line-height: 36px;
  margin: 0 0 24px;
  text-align: center;
}
#btn-row{
  margin-right: 0;
}
#random-btn{
  margin-left: 180px;
}
</style>
