<template>
  <header class="sticky-header">
    <img src="@/assets/logo.png" alt="Logo" />
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.sticky-header {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 10px 144px;
  box-shadow: 0px 2px 4px 0px #6c6c6c2e;
  z-index: 100;
}
img {
  width: 213px;
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  img {
    width: 140px;
  }
}
@media only screen and (min-width: 561px) and (max-width: 768px) {
  .sticky-header {
    padding: 10px 100px;
  }
  img {
    width: 140px;
  }
}
@media only screen and (max-width: 560px) {
  .sticky-header {
    padding: 10px 50px;
  }
  img {
    width: 100px;
  }
}
</style>
