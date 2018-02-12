<template>
  <div id="app">
    <router-view style="padding-bottom:400px"></router-view>
    <footer>
      <customer-footer/>
    </footer>
  </div>
</template>

<script>
import customerFooter from '././components/common/customfooter'
export default {
  name: 'app',
  components: {
    customerFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  position: relative;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
