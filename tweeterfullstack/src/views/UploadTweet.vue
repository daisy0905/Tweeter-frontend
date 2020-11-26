<template>
    <div id="tweet">
        <div id="container-1">
            <img @click="goToHome" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvz8HF_jjIpaNgkrFzcw9E2N9Y6SA13DfCcQ&usqp=CAU" alt="icon of back to home page">
            <h4>Go to Home</h4>
            <div></div>
            <h4>Go to Profile</h4>
            <img id="arrow-right" @click="goToProfile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvz8HF_jjIpaNgkrFzcw9E2N9Y6SA13DfCcQ&usqp=CAU" alt="icon of back to home page">
        </div>
        <div id="container-2">
            <img :src="UserPhoto" id="userPhoto" alt="user image"> 
            <textarea id="tweet-text" v-model="content"></textarea>
        </div>
        <div id="tweet-btn">
            <button @click="createTweet">Create Tweet</button>
            <button @click="updateTweet">Update Tweet</button>
        </div>
        <h3>{{ tweetStatus }}</h3>
        <div id="space"></div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        data() {
            return {
                UserPhoto: cookies.get("userImage"),
                token: cookies.get("loginToken"),
                content: "",
                tweet: {},
                tweetStatus: "Tweets!"
            }
        },
        methods: {
            goToHome: function() {
                this.$router.push("/home");
            },
            goToProfile: function() {
                this.$router.push("/profile");
            },
            createTweet: function() {
                this.tweetStatus = "Tweeting!"
                axios.request({
                   url: "http://127.0.0.1:5000/tweets",
                   method: "POST",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   data: {
                       token: this.token,
                       content: this.content
                   }
                }).then((response) => {
                   console.log(response);
                   this.tweetStatus = "Tweeted!";
                   this.tweet = response.data;
                   console.log(this.tweet);
                   cookies.set("idUser", response.data.userId)
                }).catch((error) => {
                   console.log(error);
                   this.tweetStatus = "Failed to tweet!";
                })
           },
           updateTweet: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/tweets",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: this.token,
                        id: cookies.get("userTweetId"),
                        content: this.content
                    }
                }).then((response) => {
                    console.log(response);
                    this.tweetStatus = "Updated!";
                }).catch((error) => {
                    console.log(error);
                    this.tweetStatus = "Failed to update!";
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#tweet {
    min-height: 100vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#container-1 {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 10% 30% 20% 30% 10%;

    img {
        width: 5vw;
    }

    h4 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
    }

    #arrow-right {
        transform: scaleX(-1);
        width: 5vw;
    }
}

#container-2 {
    min-height: 50vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    #userPhoto {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
        }

    #tweet-text {
        width: 80%;
        height: 40vh;
        background-color: #E1E8ED;
        border: 1px solid #AAB8C2;
        margin: 0 0 1em 0;
        border-bottom: 1px solid #1DA1F2;
        text-align: center;
    }
}

#tweet-btn {
    min-height: 10vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;

    button {
        width: 25vw;
        height: 5vh;
        background-color: #1DA1F2;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border: none;
        border-radius: 1.5em;
        font-weight: bold;
    }
}

h3 { 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        text-align: left;
    }

#space {
    min-height: 30vh;
}
</style>