<template>
  <div>
    <MyBookmarks></MyBookmarks>
    <Footer></Footer>
  </div>
</template>

<script>
import MyBookmarks from "../components/MyBookmarks";
import Footer from "../components/Footer";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Bookmarked",
  components: {
    MyBookmarks,
    Footer
  }
}
</script>

<style scoped>

footer{
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -100px;
}

</style>
