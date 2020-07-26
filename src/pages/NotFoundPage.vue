<template>
  <div class="container">
    <img src="../assets/page_not_found.png" alt="page_not_found" id="page_not_found" class="centerPageNotFound">
    <br>
    <h4 id="ClickHere"><router-link to="/" exact>Click here to return to main page</router-link></h4>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.centerPageNotFound {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#ClickHere
{
  text-align: center;
  font-family: serif;
}


</style>
