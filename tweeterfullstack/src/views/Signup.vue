<template>
    <div id="signup">
        <div id="header">
            <img src="https://mobiledevmemo.com/wp-content/uploads/2014/05/Twitter-Bird.png" alt="twitter logo">
            <h1>Create your account</h1>
        </div>
        <sign-up-form></sign-up-form>
    </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm.vue'
    export default {
        name: "signup-page",
        components: {
            SignUpForm,
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

#signup {
    min-height: 100vh;
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
</style>