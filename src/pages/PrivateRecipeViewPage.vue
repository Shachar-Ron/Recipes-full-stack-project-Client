


<template>

  <!-- If You Click On Image go to recipe page -->
  


<!-- style="max-width: 1200px;" -->
    <div>
  <b-card no-body bg-variant="light" :header="recipes[0].title"    style="width: 70%; " >
      <div style="width:100%; text-align:center">
       <b-card-img :src="recipes[0].image" class="recipe-image" alt="Image" style="max-width: 500px;"  ></b-card-img>
        </div>
     
       

                      <!-- <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div> -->
        <b-card-body  :title="recipes[0].title"  class="recipe-title">
           <b-row >
          <b-col md="4">
            
          <ul class="recipe-overview" id="recipe-overview">
            <!-- <li><div>Ready in {{ recipes[0].time }} minutes</div></li> -->
             <h5><b>Ready in {{ recipes[0].time }} minutes</b></h5>
             <h5><b>Number of dishes: {{recipes[0].num_of_dishes}}</b></h5>
           
          </ul>
          
        
            <ul>
               <b>Ingredients:</b>
              <li
                v-for="(r, index) in recipes[0].ingredients"
                :key="index + '_' + r.id"
              >
                {{ r }}
              </li>
          </ul>
           
            </b-col>
             <b-col md="8">
            <b> Instructions: </b>
            <ol>
              <li v-for="s in recipes[0].instructions" :key="s.number">
                {{ s }}
              </li>
            </ol>
               </b-col>
             </b-row >
            <ul>
              
        <!-- <b-row >
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
        </b-row>  -->
              
          </ul>
         


        </b-card-body>
    
   
  </b-card>
</div>
      
</template>

<script>
export default {

  data() {
    return {
      search_params: "",
      recipes: []
    };
  },
    mounted() {
    this.updateResults();
  },
//   created :function (){
//     console.log("mounted"+this.numberOfRrsults)
//   },
  methods: {
    async updateResults() {
    let recID=this.$route.params.recipeId
      try {
        
        const response = await this.axios.get(
          //"https://assigment3-2-roman.herokuapp.com/profile/get_family_recipes",
            "https://assigment3-2-roman.herokuapp.com/profile/my_recipe/"+recID ,
          {
            withCredentials: true,
            username: this.$root.store.username 
          }
        );
        // console.log(response);
        // const recipes = response.data.recipes;
        // this.recipes = [];
        // this.recipes.push(...recipes);
        // console.log(this.recipes);

        console.log(response);
        const recipes = response.data;
        console.log(recipes)
        this.recipes = [];
        const temp =[];
        for (var key in recipes) {
          temp.push( [ key, recipes[key] ] );
        }
        console.log(temp)
        const temp2 = temp.map(function(o) {
          return o[1];
        });
        console.log(temp2)
        
        // temp2[0].instructions= temp2[0].instructions.replace(' ','');

        temp2[0].instructions=temp2[0].instructions.split(".");

        // temp2[3].instructions=temp2[3].instructions.split(".");

        temp2[0].ingredients=temp2[0].ingredients.split(".");

        //  temp2[3].ingredients=temp2[3].ingredients.split(".");
         console.log("------------------------------------------------------------------------------------")
        console.log( temp2[0].ingredients)
        this.recipes = [];
        this.recipes.push(...temp2);
        let a=1;
      } catch (error) {
        console.log(error);
      }
    },
   

   
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


/* .recipe-header{

} */
</style>
