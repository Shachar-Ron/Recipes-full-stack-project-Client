<template>
  <div class="container">
    <br />
    <b-card bg-variant="light" header="Login" class="text-center" id="b-card">
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          style="width:100px;display:block;"
          class="mx-auto w-100"
        >Login</b-button>
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="register">Click Me! &#128515;</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >Login failed: {{ form.submitError }}</b-alert>
    </b-card>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
    name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          "https://assigment3-2-roman.herokuapp.com/user/login",
          {
            username: this.form.username,
            password: this.form.password
          },
          {
            withCredentials: true
          }
        );
        console.log(response);
        console.log(this.$router.currentRoute.name);
        this.$root.store.login(this.form.username);
        if(this.$router.currentRoute.name !== "main"){
          this.$router.push("/");
        }
        
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
#b-card{
  width: 100%;
}

</style>