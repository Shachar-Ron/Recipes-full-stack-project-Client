<template>
  <b-card border-variant="info" header style="width: 100%; height: 100%">
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1 align="center">{{ recipe.title }}</h1>
          <!-- <br />
          <br /> -->
          <img :src="recipe.image" class="center" height="400" width="200" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <h6>
                  <b>By: {{recipe.whos_rec}}</b>
                </h6>
                <h6>
                  <b>Holiday: {{recipe.what_holiday}}</b>
                </h6>
                <h6>
                  <b>Number of dishes: {{recipe.num_of_dishes}}</b>
                </h6>
                <div>Ready in {{ recipe.time }} minutes</div>
              </div>
              <b>Ingredients:</b>
              <ul>
                <li v-for="s in recipe.ingredients" :key="s.number">{{ s }}</li>
              </ul>
            </div>
            <div class="wrapped">
              <b>Instructions:</b>
              <ol>
                <li v-for="s in recipe.instructions" :key="s.number">{{ s }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then(i => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false
    };
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
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
  height: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 50%;
}
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
  font-size: 1.2em;
  height: 50%;
}

/* .recipe-header{

} */
</style>
