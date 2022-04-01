<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    
    <input type="text" v-model="message"/>

    <button @click="doStuff()">DO STUFF</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: "Hello World",
    }
  },  
  methods: {
    doStuff: function() {
      alert("do stuff");
      console.log("do stuff");
      this.message = "do stuff";
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
