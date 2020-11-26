<template>
    <div id="profile">
        <div id="header">
            <div id="container-1">
                <img @click="goToHome" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvz8HF_jjIpaNgkrFzcw9E2N9Y6SA13DfCcQ&usqp=CAU" alt="icon of back to home page">
                <h3>{{ name }}</h3>
                <div></div>
                <button @click="refresh">Refresh</button>
            </div>
            <div id="container-2">
                <img src="../assets/background-landing.png" alt="">
            </div>
            <div id="container-3">
                <div id="user-image">
                    <img :src="image" alt="user image">
                    <h3>{{name}}</h3>
                </div>
                <div id="profile-btn">
                    <button v-if="userName == logUser" @click="viewProfile">Edit Profile</button>
                </div>
            </div>
            <div id="container-4">
                <h4>{{ bio }}</h4>
                <h5>Birthdate: {{ birthdate }}</h5>
                <h5>Created at: {{ created_at }}</h5>
            </div>
            <div id="container-5">
                <div class="user-follow">
                    <div></div>
                    <h5>{{ followingNum }}</h5>
                    <h4 @click="getFollowing">Following</h4>
                    <div></div>
                </div>
                <div class="user-follow">
                    <div></div>
                    <h5>{{ followerNum }}</h5>
                    <h4 @click="getFollower">Follower</h4>
                    <div></div>
                </div>
            </div>
            <div id="container-6">
                <button class="tweet-btn" @click="viewTweets">Tweets</button>
            </div>
        </div>
        <view-a-tweet class="tweets" v-for="tweet in othertweets" :key="tweet.id" :tweet="tweet"></view-a-tweet>
        <div id="tweet-icon">
            <img v-if="userName == logUser" @click="createTweet" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAXoPQzntYQAVY308mROLyPuRp1smbeMQ30g&usqp=CAU" alt="icon of write tweet">
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import ViewATweet from '../components/ViewATweet.vue'
import axios from 'axios'

    export default {
        components: {
            ViewATweet
        },
        data() {
            return {
                name: "",
                bio: "",
                birthdate: "",
                created_at: "",
                othertweets: [],
                userName: cookies.get("Name")
            }
        },
        methods: {
            refresh: function() {
                this.getProfile();
                this.getTweets();
            },
            viewProfile: function() {
                this.$store.dispatch("getProfile");
                this.$router.push("/editprofile");
            },
            viewTweets: function() {
                this.getOtherUserProfile();
                this.getOtherUserTweets();
            },
            getProfile: function() {
                axios.request({
                url: "http://127.0.0.1:5000/users",
                   method: "GET",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   params: {
                       id: cookies.get("otherId")
                   }
                }).then((response) => {
                    console.log(response);
                    this.name = response.data[0].username;
                    this.bio = response.data[0].bio;
                    this.birthdate = response.data[0].birthdate;
                    this.created_at = response.data[0].created_at;
                    this.image = response.data[0].image;
                    cookies.set("Name", response.data[0].username)
                }).catch((error) => {
                    console.log(error);
                })
            },
            getTweets: function() {
                axios.request({
                url: "http://127.0.0.1:5000/tweets",
                   method: "GET",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   params: {
                       id: cookies.get("otherId")
                   }
                }).then((response) => {
                    console.log(response);
                    this.othertweets = response.data;
                    console.log(this.othertweets);
                }).catch((error) => {
                    console.log(error);
                }) 
            },
            getFollowing: function() {
                this.$store.dispatch("getFollowing");
                this.$router.push("Follow");
            },
            getFollower: function() {
                this.$store.dispatch("getFollower");
                this.$router.push("Follow");
            },
            goToHome: function() {
                this.$store.dispatch("getAllUsers");
                this.$store.dispatch("getAllTweets");
                this.$store.dispatch("getFollowing");
                this.$router.push("Home")
            },
            createTweet: function() {
                this.$router.push("/tweet");
            },
        },
        mounted () {
            this.getProfile();
            this.getTweets();
            this.$store.dispatch("getFollowing");
            // this.$store.dispatch("getFollower");
            // this.$store.dispatch("getProfile");
            // this.$store.dispatch("getTweets");
        },
        computed: {
            followingNum: function() {
                return this.$store.state.follows.length;
            },
            followerNum: function() {
                return this.$store.state.followers.length;
            },
            logUser() {
                return cookies.get('userName') 
            }
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

#profile {
    min-height: 100vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#header {
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
    grid-template-columns: 10% 15% 45% 30%;
    margin-bottom: 1em;

    img {
        width: 5vw;
    }

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }

    button {
        width: 25vw;
        height: 5vh;
        background-color: white;
        color: #1DA1F2;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border: 1px solid  #1DA1F2;
        border-radius: 1.5em;
        font-weight: bold;
    }
}

#container-2 {
    min-height: 20vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    img {
        width: 100%;
        height: 20vh;
        object-fit: cover;
    }
}

#container-3 {
    min-height: 10vh;
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;

    #user-image {
        width: 100%;
        min-height: 10vh;
        display: grid;
        grid-template-rows: 80% 20%;
        position: relative;

        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 50%;
            display: grid;
            justify-items: left;
            align-items: center;
            margin-left: 1em;
            position: absolute;
            top: -5vh;
            border: 2px solid white;
        }

        h3 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1rem;
            position: absolute;
            top: 10vh;
            left: 12vw;
        }
    }

    #profile-btn {
        display: grid;
        justify-items: center;
        align-items: center;
        width: 100%;

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
}

#container-4 {
    height: 5vh;
    width: 90%;
    display: grid;
    justify-items: left;
    align-items: center;
    margin-top: 4vh;

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem; 
        margin-bottom: 1em;
    }

    h5 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.7rem; 
        color: grey;
        margin: 0.3em 0 0.3em 0;
    }
}

#container-5 {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    margin-top: 2em;


    .user-follow {
        height: 5vh;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr 1.5fr 1fr;

        h5 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
        }

        h4 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #1DA1F2;
        }
    }
}

#container-6 {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    margin-top: 2em;

    .tweet-btn {
        width: 30vw;
        height: 5vh;
        color: #1DA1F2;
        font-family: Arial, Helvetica, sans-serif;
        border: none;
        background-color: white;
        font-size: 0.8rem;
        border-bottom: 1px solid #1DA1F2;
        font-weight: bold;
    }
}

.tweets {
    min-height: 5vh;
    width: 90%;
}

#tweet-icon {
        height: 10vh;
        width: 100%;
        display: grid;
        align-items: center;
        justify-items: center;

        img {
            position: fixed;
            bottom: 20vh;
            right: 2vw;
            width: 15%;
            z-index: 10;
        }
    }

</style>