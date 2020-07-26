<template>
  <div class="container">
    <h1>Favorites</h1>
    <div id="favorite_main_div">
      <PrivateRecipePreviewList  class="Favorite center" id="PrivateRecipePreviewList"/>
    </div>
  </div>
</template>

<script>
import PrivateRecipePreviewList from "../components/PrivateRecipePreviewList";
export default {
  components: {
    PrivateRecipePreviewList
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
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

#favorite_main_div {
  margin: auto;
  width: 50%;
  padding: 10px;
  height: 600px;
  overflow: auto;
}
#PrivateRecipePreviewList{
  padding: 10px;
}

h1 { color: #ffffff; font-family: 'Raleway',sans-serif; font-size: 30px; font-weight: 800; line-height: 36px; margin: 0 0 24px; text-align: center; }

</style>
