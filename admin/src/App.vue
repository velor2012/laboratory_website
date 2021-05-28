<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class App extends Vue {

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
body{
  margin: 0;
  padding: 0;
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.el-table__row{
  cursor: pointer;
}
</style>
