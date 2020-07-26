<template>
  <b-container>
    <h1>
      {{ title }}:
      <slot></slot>
    </h1>
    <b-row v-for="r in recipes" :key="r.id">
      <b-col>
        <UserRecipePreview class="UserRecipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserRecipePreview from "./UserRecipePreview.vue";
export default {
  name: "UserRecipePreviewList",
  components: {
    UserRecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    isLastSeen: {
      type: Boolean,
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
    async updateRecipes() {
      try {
        const response = await this.axios.get(
            "https://assigment3-2-roman.herokuapp.com/profile/my_recepies",
            {
              withCredentials: true,
              username: this.$root.store.username
            }
          );


        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log("User-Recipe-PreviewList-error");
        console.log(error);
        // console.log(error);
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
h1 { color: #ffffff; font-family: 'Raleway',sans-serif; font-size: 30px; font-weight: 800; line-height: 36px; margin: 0 0 24px; text-align: center; }

</style>
