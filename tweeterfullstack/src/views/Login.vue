<template>
    <div id="login">
        <div id="header">
            <img src="https://mobiledevmemo.com/wp-content/uploads/2014/05/Twitter-Bird.png" alt="twitter logo">
            <h1>Log in to Tweeter</h1>
        </div>
        <login-form></login-form>
        <h4 @click="signUp">Sign up for Tweeter</h4>
    </div>
</template>

<script>
import LoginForm from '../components/LogInForm.vue'

    export default {
        components: {
            LoginForm
        },
        methods: {
            signUp: function() {
                this.$router.push("/signup");
            },
        },
        mounted () {
            this.$store.dispatch("getFollowing");
        },
    }
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#login {
    min-height: 60vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#header {
    min-height: 15vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    margin: 2em 0 2em 0;

    img {
        display: block;
        width: 15vw;
        margin-bottom: 2em;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 1.5rem;
    }
}

h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        color: #1DA1F2;
    }
</style>