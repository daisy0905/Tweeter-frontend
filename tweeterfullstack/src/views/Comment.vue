<template>
    <div id="comment">
        <div id="nav">
            <button @click="goToHome">Home</button>
            <div></div>
            <button @click="goToProfile">Profile</button>
        </div>
        <div id="tweet">
            <div id="container-1">
                <div></div>
                <h3>{{ username }}</h3>
                <h4>{{ date }}</h4>
                <div></div>
            </div>
            <p>{{ tweet }}</p>
        </div>
        <div id="reply">
            <div id="image">
                <img :src="image" id="userPhoto" alt="user image">
            </div>
            <div id="text">
                <textarea id="comment-area" v-model="content"></textarea>
            </div>
        </div>
        <div id="comment-btn">
            <button @click="createComment">Reply</button>
            <button @click="updateComment">Update</button>
        </div>
        <h3>{{ commentStatus }}</h3>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        data() {
            return {
                UserPhoto: cookies.get("userPicture"),
                image: cookies.get("userImage"),
                token: cookies.get("loginToken"),
                username: cookies.get("tweetUsername"),
                userTweetId: cookies.get("tweetTweetId"),
                tweet: cookies.get("tweetContent"),
                date: cookies.get("tweetTime"),
                content: "",
                comment: {},
                commentStatus: "Comment!"
            }
        },

        methods: {
            goToHome: function() {
                this.$router.push("Home");
            },
            goToOtherProfile: function() {
                this.$router.push("OtherProfile");
            },
            goToProfile: function() {
                this.$router.push("Profile");
            },
            createComment: function() {
               axios.request({
                   url: "http://127.0.0.1:5000/comments",
                   method: "POST",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   data: {
                       token: this.token,
                       content: this.content,
                       tweet_id: this.userTweetId
                   }
               }).then((response) => {
                   console.log(response);
                   this.commentStatus = "Commented!";
                   this.comment = response.data;
                   console.log(this.comment);
               }).catch((error) => {
                   console.log(error);
                   this.commentStatus = "Failed to comment!";
               })
            },
            updateComment: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/comments",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: this.token,
                        id: cookies.get("userCommentId"),
                        content: this.content
                    }
                }).then((response) => {
                    console.log(response);
                    this.commentStatus = "Updated!";
                }).catch((error) => {
                    console.log(error);
                    this.commentStatus = "Failed to update!";
                })
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

#comment {
    min-height: 50vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#nav {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1.5fr 1fr;

    button {
        width: 25vw;
        height: 5vh;
        background-color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border: none;
        color:#1DA1F2;
        font-weight: bold;
    }
}

#tweet {
    min-height: 10vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    #container-1 {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 10% 20% 60% 10%;

        h3 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1rem;
        }

        h4 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem; 
        } 
    }

    p { 
        width: 100%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
    }
}

#reply {
    min-height: 10vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    #image {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;

        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
    }

    #text {
        width: 90%;
        height: 25vh;
        display: grid;
        justify-items: center;
        align-items: center;
        margin-top: 1em;

        #comment-area {
            width: 100%;
            height: 100%;
        }
    }
}

#comment-btn {
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

</style>