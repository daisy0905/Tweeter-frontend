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
                    <button @click="viewProfile">Edit Profile</button>
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
            <a-retweet class="tweets" v-for="retweet in retweets" :key="retweet.id" :retweet="retweet"></a-retweet>
            <view-a-tweet class="tweets" v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" :retweet="retweet"></view-a-tweet>
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import ViewATweet from '../components/ViewATweet.vue'
import ARetweet from '../components/ARetweet.vue'
import axios from 'axios'

    export default {
        components: {
            ViewATweet,
            ARetweet
        },
        props: {
            retweet: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                tweets: [],
                retweets: [],
            }
        },
        methods: {
            refresh: function() {
                this.getTweets();
                this.getRetweets();
                this.$store.dispatch("getProfile")
            },
            viewProfile: function() {
                this.$router.push("/editprofile");
            },
            viewTweets: function() {
                this.getTweets();
            },
            viewRetweets: function() {
                this.getRetweets();
            },
            getTweets: function() {
                axios.request({
                url: "http://127.0.0.1:5000/tweets",
                   method: "GET",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   params: {
                       id: cookies.get("userId")
                   }
                }).then((response) => {
                    console.log(response);
                    this.tweets = response.data;
                    console.log(this.tweets);
                }).catch((error) => {
                    console.log(error);
                }) 
            },
            getRetweets: function() {
                axios.request({
                url: "http://127.0.0.1:5000/retweets",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    user_id: cookies.get("userId"),
                }
                }).then((response) => {
                    console.log(response.data);
                    this.retweets = response.data;
                }).catch((error) => {
                    console.log(error)
                })
            },
            getFollowing: function() {
                this.$store.dispatch("getUserFollowing");
                this.$router.push("/userfollow");
            },
            getFollower: function() {
                this.$store.dispatch("getUserFollower");
                this.$router.push("/userfollow");
            },
            goToHome: function() {
                this.$store.dispatch("getAllUsers");
                this.$store.dispatch("getAllTweets");
                this.$store.dispatch("getUserFollowing");
                this.$router.push("/home")
            },
            createTweet: function() {
                this.$router.push("/tweet");
            },
        },
        mounted () {
            this.getTweets();
            this.$store.dispatch("getUserFollowing");
            this.$store.dispatch("getUserFollower");
            this.$store.dispatch("getProfile");
            this.getRetweets()
        },
        computed: {
            followingNum: function() {
                return this.$store.state.userFollows.length;
            },
            followerNum: function() {
                return this.$store.state.userFollowers.length;
            },
            email: function() {
                return this.$store.state.user.email
            },
            name: function() {
                return this.$store.state.user.username
            },
            bio: function() {
                return this.$store.state.user.bio
            },
            birthdate: function() {
                return this.$store.state.user.birthdate
            },
            image: function() {
                return this.$store.state.user.image
            },
            created_at: function() {
                return this.$store.state.user.created_at
            },
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
    margin-top: 3em;


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