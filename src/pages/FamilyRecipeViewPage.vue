<template>
  <div class="container" id="container">
    <div v-if="recipe" id="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>

        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper" id="wrapper">
          <div class="wrapped">
            <div class="mb-3">
               <h6><b> By: {{recipe.author_id}}</b></h6>
               <h6><b>Holiday: {{recipe.readyInMinutes}}</b></h6>
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      // try {
      //   response = await this.axios.get(
      //     "https://assigment3-2-roman.herokuapp.com/profile/my_recepies",
      //   );
  let recID=this.$route.params.recipeId
      let response2=response.data[0];
      let a=1;
      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response2;
       let _instructions = analyzedInstructions
        .map((fstep) => {
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
        title
      };
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
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
/* .recipe-header{
} */
/* #container{
  width: 80%;
  max-height: 300px
} */
#recipe{
  width: 80%;
  /* height: 80%; */
}
/* #wrapper{
  height: 350px;
} */
/* .card-body{
  height: 80%;
} */
</style>