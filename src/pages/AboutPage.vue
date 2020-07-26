<template>
  <div class="container">
    <h1 align="center" class="title">About us!</h1>

    <hr />

    <b-row align="center">
      <b-col>
        <b-card id="info-about-us"
          bg-variant="light"
          class="text-center"
          
        >
          <h3>Shachar Ron</h3>
          <br />
          <br />
          <a href="https://www.linkedin.com/in/shachar-ron-5a0bb814a/">
            <img src="../assets/linkedin.jpg" alt="HTML tutorial" id="image" />
          </a>
          <a href="https://github.com/Shachar-Ron">
            <img src="../assets/git.png" alt="HTML tutorial" id="image" />
          </a>
        </b-card>
      </b-col>

      <b-col>
        <b-card id="info-about-us"
          bg-variant="light"
          class="text-center"
        >
          <h3>Roman Grigorenko</h3>
          <br />
          <br />
          <a href="https://www.linkedin.com/in/roman-grig/">
            <img src="../assets/linkedin.jpg" alt="HTML tutorial" id="image" />
          </a>
          <a href="https://github.com/grigroman">
            <img src="../assets/git.png" alt="HTML tutorial" id="image" />
          </a>
        </b-card>
      </b-col>
    </b-row>

    <div align="center">
      <div class="edit_hover_class">
        <a
          href="https://github.com/SISE-Web-Development-Environments/assignment3-1-roman-ron-assigment3-1"
          class="btn btn-light btn-lg"
        >3.1- API</a>
        <br />
        <br />
      </div>
      <div class="edit_hover_class">
        <a
          href="https://github.com/SISE-Web-Development-Environments/assignment-3-2-roman_shachar"
          class="btn btn-light btn-lg"
        >3.2-Server</a>
      </div>
    </div>

    <br />
    <br />
    <br />
    <div id="main-caro">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="480"
        img-height="1024"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          class="img"
          img-src="https://res.cloudinary.com/dcrojuyka/image/upload/v1595076944/about5_secics.jpg"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide
          class="img"
          img-src="https://res.cloudinary.com/dcrojuyka/image/upload/v1595076944/about4_xidwur.jpg"
        ></b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide
          class="img"
          img-src="https://res.cloudinary.com/dcrojuyka/image/upload/v1595080267/111_ocup56.jpg"
        ></b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template v-slot:img>
            <img
              class="img"
              src="https://res.cloudinary.com/dcrojuyka/image/upload/v1595076944/about3_jchyl9.jpg"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
.container {
  font-family: Impact, Charcoal, sans-serif;
}
h1 {
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 30px;
  font-weight: 800;
  line-height: 36px;
  margin: 0 0 24px;
  text-align: center;
}
.edit_hover_class:hover a {
  font-size: 150%;
}
.img {
  width: 1200px;
  height: 400px;
}
#main-caro{
  width: 100;
  height: 100;
  border-style: solid;
  border-color: white;
}
#info-about-us{
  width: 75%; 
  height: 100%;
}
#image{
  width: 42px;
  height: 42px;
}
</style>
