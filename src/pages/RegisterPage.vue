<template>
  <div class="container">
    <b-card bg-variant="light" header="Register" class="text-center" id="b-card">
      <!-- <h1 class="title">Register</h1> -->
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <!-- User Name -->
        <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.username.length"
          >Username length should be between 3-8 characters long</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">Username alpha</b-form-invalid-feedback>
        </b-form-group>

        <!-- First Name -->
        <b-form-group
          id="input-group-firstname"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstname"
        >
          <b-form-input
            id="firstname"
            v-model="$v.form.firstname.$model"
            type="text"
            :state="validateState('firstname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstname.required">First Name is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.firstname.length"
          >First Name length should be more the 1 character long</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.firstname.alpha">First Name alpha</b-form-invalid-feedback>
        </b-form-group>

        <!-- Last Name -->
        <b-form-group
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastname"
        >
          <b-form-input
            id="lastname"
            v-model="$v.form.lastname.$model"
            type="text"
            :state="validateState('lastname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastname.required">Last Name is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.lastname.length"
          >Last Name length should be more the 1 character long</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">Last Name alpha</b-form-invalid-feedback>
        </b-form-group>

        <!-- Password -->
        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be
            <strong>strong</strong>.
            <br />For that, your password should be also:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.length"
          >Have length between 5-10 characters long</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-if="!$v.form.password.validatePassword"
          >Password must contains at least one character, one number and one symbol</b-form-invalid-feedback>
        </b-form-group>

        <!-- Confirm Password -->
        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form.confirmedPassword.required"
          >Password confirmation is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >The confirmed password is not equal to the original password</b-form-invalid-feedback>
        </b-form-group>

        <!-- EMail -->
        <b-form-group id="input-group-email" label-cols-sm="3" label="E-Mail:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">E-Mail is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">This E-Mail is not legal</b-form-invalid-feedback>
        </b-form-group>

        <!-- Country -->
        <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
          ></b-form-select>
          <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
        </b-form-group>

        <!-- imageUrl -->
        <b-form-group
          id="input-group-imageUrl"
          label-cols-sm="3"
          label="Profile Image:"
          label-for="imageUrl"
        >
          <b-form-input
            id="imageUrl"
            v-model="$v.form.imageUrl.$model"
            type="text"
            :state="validateState('imageUrl')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.imageUrl.required">Profile Photo is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.imageUrl.url">illegal Url link</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>

        <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Register</b-button>
        <!-- Move to Login Page -->
        <div class="mt-2">
          You have an account already?
          <router-link to="login">Log in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >Register failed: {{ form.submitError }}</b-alert>
    </b-card>
    <br>
  </div>
</template>



<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        imageUrl: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: u => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        required,
        length: u => minLength(2)(u),
        alpha
      },
      lastname: {
        required,
        length: u => minLength(2)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: p => minLength(5)(p) && maxLength(10)(p),
        validatePassword: p =>
          new RegExp(
            `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9@$!%*?&]`
          ).test(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      },
      imageUrl: {
        required,
        url
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "https://assigment3-2-roman.herokuapp.com/user/register",
          {
            username: this.form.username,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            email: this.form.email,
            imageUrl: this.form.imageUrl,
            password: this.form.password
          }
        );
        //console.log(response);
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        // console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        imageUrl: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>



<style lang="scss" scoped>
.container {
  max-width: 600px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
#b-card {
  width: 100%;
}
</style>
