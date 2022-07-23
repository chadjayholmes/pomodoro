<template>
  <div>
    <Summaries></Summaries>
    <Footer></Footer>
  </div>

</template>

<script>
import Summaries from "../components/Summaries";
import Footer from "../components/Footer";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MySummaries",
  components: {
    Summaries,
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
