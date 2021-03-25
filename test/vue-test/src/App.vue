<template>
  <div class="App">
    <p class="title">{{message}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue'
    }
  }
}
</script>

<style scoped lang="less">
.title {
  color: skyblue;
}
</style>