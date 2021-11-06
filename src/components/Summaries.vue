<template>
  <div>
    <div v-for="summary in this.$root.$data.summaries" v-bind:key="summary" class="summary-object">
      <div class="title">
        {{ summary.title }}
      </div>
      <div class="description">
        {{ summary.description }}
      </div>
      <div class="date">
        -- {{ summary.dateAdded }}
      </div>
      <div class="categories">
        <div v-for="category in summary.categories" v-bind:key="category" class="category-text">
          #{{ category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Summaries",
}
</script>

<style scoped>

.summary-object{
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  border-left: 4px solid black;
  padding: 15px;
  border-radius: 25px;

}

.title{
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  text-align: left;
  margin-bottom: 10px;
}

.date {
  text-align: left;
  margin-bottom: 10px;
}

.categories {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.category-text {
  margin-right: 10px;
  font-style: italic;
  font-size: 12px;
}

.category-text {
  margin-right: 10px;
  font-style: italic;
  font-size: 12px;
  cursor: pointer;
}

</style>