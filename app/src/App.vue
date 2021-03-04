<template>
  <div id="app">
    <!-- Bootstrap icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/quiz">Quiz</router-link> |
      <router-link to="/hangman">Hangman</router-link> |
      <router-link to="/curr-converter">Currency Converter</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  color: white;
  padding: 30px;
  margin-bottom: 1rem;
  background: linear-gradient(
    90deg,
    rgba(85, 106, 243, 1) 0%,
    rgba(6, 149, 145, 1) 100%
  );
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #f57761;
}
</style>
