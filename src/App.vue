<template>
  <div id="app">
    <MainNavBar />
    <br>
    <router-view />
  </div>
</template>

<script>
import MainNavBar from "./components/MainNavBar";
export default {
  name: "App",
  components: {
    MainNavBar
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
  
  
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
   background-image: url('~@/assets/5.jpg');
   background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}



</style>
