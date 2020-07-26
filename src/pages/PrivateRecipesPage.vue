<template>
  <div class="container">


         <UserRecipePreviewList v-if="this.$root.store.username" title="My Recipes"></UserRecipePreviewList>

  </div>
</template>
<script>
import UserRecipePreviewList from "../components/UserRecipePreviewList";
export default {
  components: {
    UserRecipePreviewList
  },

};
</script>