<template>
    <div id="app">
        <b-nav align="center" style="margin-bottom: 20px; margin-top: 20px">
            <router-link to="/"
                ><b-button variant="primary">Komentari</b-button></router-link
            >
            <router-link to="/novi"
                ><b-button variant="primary"
                    >Dodavanje komentara</b-button
                ></router-link
            >
        </b-nav>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
