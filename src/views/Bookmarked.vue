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
  name: "Bookmarked",
  components: {
    MyBookmarks,
    Footer
  }
}
</script>

<style scoped>
</style>