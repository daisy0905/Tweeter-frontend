<template>
    <div id="tweet-list">
        <div id="container-1">
            <img @click="goToHome" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvz8HF_jjIpaNgkrFzcw9E2N9Y6SA13DfCcQ&usqp=CAU" alt="icon of back to home page">
            <h3>Back To Home</h3>
            <div></div>  
        </div>
        <div id="tweet-container">
            <h2>Discover</h2>
            <search-tweets id="tweets"></search-tweets>
        </div>
    </div>
</template>

<script>
import SearchTweets from '../components/SearchTweets.vue'
    export default {
        components: {
            SearchTweets
        },
        methods: {
            goToHome: function() {
                this.$router.push("/home")
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

#tweet-list {
    min-height: 40vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
}

#container-1 {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: left;
    align-items: center;
    grid-template-columns: 10% 45% 45%;
    margin-bottom: 1em;

    img {
        width: 5vw;
    }

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }
}

#tweet-container {
    min-height: 60vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    margin-top: 1em;
    
    h2 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 1.2rem;
        width:90%;
        text-align: left;
        border-bottom: 1px solid #1DA1F2;
    }

    #tweets {
        min-height: 60vh;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center; 
    }  
}
</style>