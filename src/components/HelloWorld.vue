<template>
  <div class="hello">
    <h1>用户名：{{ username }}</h1>
    <h1>昵称：{{ nickname }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        username: this.$store.getters.userName,
        nickname: this.$store.getters.nickName
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
