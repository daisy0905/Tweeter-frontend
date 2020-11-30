<template>
    <div id="home">
        <div v-if="login" class="login">
            <div id="user-header">
                <img @click="viewUserProfile" id="user-image" :src="image" alt="user image">
                <div>
                    <h3>{{ username }}</h3>
                    <h3>Home</h3>
                </div>
                <div></div>
                <button @click="refresh">Refresh</button>
                <button @click="userLogout" id="logout">Log Out</button>
            </div>
            <div id="user-container">
                <h2>Who to Follow</h2>
                <view-all-users id="users"></view-all-users>
            </div>
            <div id="tweet-container">
                <h2>Discover</h2>
                <view-all-tweets id="tweets"></view-all-tweets>
            </div>
           
            <div id="delete-account">
                <button @click="deleteProfile" id="delete-btn">Delete Account</button>
            </div>
            <div id="delete-profile" v-if="display == true">
                <delete-profile></delete-profile>
            </div>
            <div id="tweet-icon">
                <img @click="createTweet" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAXoPQzntYQAVY308mROLyPuRp1smbeMQ30g&usqp=CAU" alt="icon of write tweet">
            </div>
        </div>
        <div v-else class="notlogin">
            <h3>You have not logined in!</h3>
            <router-link to="Login">Login Page</router-link>
        </div>
    </div>
</template>

<script>

import cookies from 'vue-cookies'
import ViewAllTweets from '../components/ViewAllTweets.vue'
import ViewAllUsers from '../components/ViewAllUsers.vue'
import DeleteProfile from '../components/DeleteProfile.vue'

    export default {
        components: {
            ViewAllTweets,
            ViewAllUsers,
            DeleteProfile
        },
        data() {
            return {
                login: true,
                token: cookies.get("loginToken"),
                status: "",
                display: false,
                image: "",
                username: cookies.get("userName")
            }
        },
        methods: {
            checkLogin: function() {
                if(this.token != undefined) {
                    this.login = true
                }
            },
            decodeImage: function() {
                var encodedUrl = cookies.get('userImage')
                this.image = decodeURI(encodedUrl)
                console.log(this.image)
            },
            mounted: function() {
                this.checkLogin();
                this.decodeImage();
                this.$store.dispatch("getUserFollowing");
                this.$store.dispatch("getAllUsers");
                this.$store.dispatch("getAllTweets");
                this.$store.dispatch("getAllRetweets");
            },
            viewUserProfile: function() {
                this.$router.push("/userintro");
            },
            userLogout: function() {
                cookies.remove("decoUserImage");
                cookies.remove("loginToken");
                cookies.remove("userId");
                cookies.remove("tweetContent");
                cookies.remove("tweetTweetId");
                cookies.remove("userCommentId");
                cookies.remove("userName");
                cookies.remove("otherId");
                cookies.remove("tweetUsername");
                cookies.remove("tweetTime");
                cookies.remove("userPicture");
                cookies.remove("userContent");
                cookies.remove("userTweetId");
                this.$router.push("/login");
            },
            deleteProfile: function() {
                this.display =! this.display;
            },
            createTweet: function() {
                this.$router.push("/tweet");
            },
            refresh: function() {
                this.decodeImage();
                this.$store.dispatch("getAllUsers");
                this.$store.dispatch("getAllTweets");
                this.$store.dispatch("getUserFollowing");
                this.$store.dispatch("getUserFollower");
                this.$store.dispatch("getAllRetweets");
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

#home {
    min-height: 100vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
}

.login {
    min-height: 100vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    
    #user-header {
        height: 10vh;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-items: center;
        align-items: center;
        border-bottom: 2px solid #1DA1F2;

        #user-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 50%;
        }

        h3 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1rem;
        }

        button {
            width: 20vw;
            height: 5vh;
            border: 1px solid #1DA1F2;
            color: #1DA1F2;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            border-radius: 1.5em;
            font-weight: bold;
            margin-right: 2em;
            background-color: white;
        }
    }

    #user-container {
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
            border-bottom: 1px solid #AAB8C2;
        }

    #users {
        min-height: 60vh;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center; 
        grid-template-columns: 1fr 1fr;
        column-gap: 1vw;
        margin-top: 1em;
        row-gap: 1vh;
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

    #delete-account {
        display: grid;
        justify-items: center;
        align-items: center; 
    }

    #delete-btn {
        width: 30vw;
        height: 5vh;
        color: #1DA1F2;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border: 1px solid #1DA1F2;
        border-radius: 1.5em;
        font-weight: bold;
        margin-top: 2em;
    }

    #delete-profile {
        width: 90%;
        height: 15vh;
        display: grid;
        justify-items: center;
        align-items: center;
        margin-top: 1em; 
    }

    #tweet-icon {
        height: 10vh;
        width: 100%;
        display: grid;
        align-items: center;
        justify-items: center;

        img {
            position: fixed;
            top: 20vh;
            right: 2vw;
            width: 15%;
            z-index: 10;
        }
    }

}
</style>
