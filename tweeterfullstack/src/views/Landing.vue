<template>
    <div id="landing">
        <div id="header">
            <img src="https://mobiledevmemo.com/wp-content/uploads/2014/05/Twitter-Bird.png" alt="twitter logo">
            <h1>See what's happening in the world right now</h1>
        </div>
        <div id="content-1">
            <h3>Join Tweeter today.</h3>
            <button @click="signup" class="btn">Sign up</button>
            <button @click="login" class="btn">Login in</button>
        </div>
        <div id="content-2">
            <div id="icon">
                <img class="icon" src="../assets/search-icon.jpg" alt="search icon">
                <img class="icon" src="../assets/group-icon.jpg" alt="group people icon">
                <img class="icon" src="../assets/network-icon.png" alt="network icon">
            </div>
            <div id="text">
                <h2>Follow your interests.</h2>
                <h2>Hear what people are talking about.</h2>
                <h2>Join the conversation</h2>
            </div>
        </div>
        <div id="content-3">
            <p>About<span></span>Help Center<span></span>Cookie Policy<span></span>Tweeter for Business</p>
            <p>@2020 Tweeter</p>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            signup: function() {
                this.$router.push("/signup")
            },
            login: function() {
                this.$router.push("/login")
            }
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

#landing {
    min-height: 100vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#header {
    min-height: 15vh;
    width: 90%;
    display: grid;
    justify-items: left;
    align-items: center;

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

#content-1 {
    min-height: 20vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        margin: 0 0 1em 1em;
        font-size: 1rem;
    }

    .btn {
        width: 80vw;
        height: 5vh;
        margin: 1em;
        border: 2px solid #1DA1F2;
        border-radius: 2em;
        background-color: white;
        font-size: 1rem;
        font-family: Arial, Helvetica, sans-serif;
    }

    .btn:hover {
       background-color:  #1DA1F2;
       color: white;
    }
}

#content-2 {
    min-height: 35vh;
    background: url(../assets/background-landing.png);
    background-size: cover;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 30% 70%;
    justify-content: center;
}

#icon {
    width: 100%;
    height: 90%;
    display: grid;
    align-items: center;
    justify-items: center;

    .icon {
        width: 30%;
    }
}

#text {
    width: 100%;
    height: 90%;
    display: grid;
    align-items: center;
    justify-items: left;

    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        font-size: 1.2rem;
    }
}

#content-3 {
    width: 90%;
    min-height: 10vh;
    display: grid;
    align-items: center;
    justify-items: center;

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
    }
}
   
</style>