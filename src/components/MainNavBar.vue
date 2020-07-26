<template>
  <div id="MainNavBar">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Master Chef</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id="mainPage">
          <b-nav-item>
            <router-link :to="{ name: 'main' }">Main Page</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'search' }">Search</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'about' }">About</router-link>
          </b-nav-item>
          <b-nav-item-dropdown id="personal" v-if="$root.store.username">
            <template v-slot:button-content>
              <span>Personal</span>
            </template>
            <b-dropdown-item>
              <router-link :to="{ name: 'favorites' }">Favorites</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'privateRecipes' }">Private Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'familyRecipe' }">Family Recipes</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>-->
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span v-if="!$root.store.username">Guest</span>
              <span v-else>{{ $root.store.username }}</span>
            </template>
            <b-dropdown-item v-if="!$root.store.username">
              <router-link :to="{ name: 'login' }">Login</router-link>
            </b-dropdown-item>
            <b-dropdown-item v-else>
              <span>Profile</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="!$root.store.username">
              <router-link :to="{ name: 'register' }">Register</router-link>
            </b-dropdown-item>
            <b-dropdown-item v-else>
              <span @click="Logout">Log Out</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "MainNavBar",
  methods: {
    async Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      try{
      const response = await this.axios.get(
        "https://assigment3-2-roman.herokuapp.com/user/logout",
        {
          withCredentials: true,
        }
      );
    }catch(error){
      console.log(error);
    }
    }
  }
};
</script>

<style>
a:visited {
  color: black;
}
a:active {
  color: greenyellow;
}
#mainPage a:visited {
  color: white;
}
#personal a:visited {
  color: black;
}
</style>