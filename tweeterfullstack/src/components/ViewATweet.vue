<template>
    <div id="tweet-unit">
        <div id="container-1">
            <h3>{{ tweet.username }}</h3>
            <h4>{{ tweet.created_at }}</h4>
            <div></div>
        </div>
        <div id="container-2">
            <p>{{ tweet.content }}</p>
        </div>
        <div id="container-3">
            <div></div>
            <div id="unit-1">
                <h5 @click="viewComments">{{ commentNum }}</h5>
                <img @click="createComment" src="https://www.kindpng.com/picc/m/153-1537658_twitter-comment-icon-png-clipart-png-download-topic.png" alt="tweeter comment icon">
            </div>
            <div id="unit-2">
                <span id="like-active">{{ likeNum }}</span>
                <img src="https://www.pngitem.com/pimgs/m/77-770619_leave-a-reply-cancel-reply-twitter-like-icon.png" alt="tweeter like icon" v-if="ifLike" @click="deleteLike">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-xxei2BZj50qLOyvtuvF7s3RmxqMPoT9wNg&usqp=CAU" alt="tweeter unlike icon" v-else @click="createLike">
            </div>
            <div id="unit-3">
                <img v-if="tweet.username == logUser" @click="updateTweet" src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png" alt="tweeter update icon">
                <img v-if="tweet.username == logUser" @click="deleteTweet" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&usqp=CAU" alt="tweeter delete icon">
            </div>
            <div></div>
        </div>
        <div id="container-4" v-if="display == true">
            <comment class="comments" v-for="comment in comments" :key="comment.id" :comment="comment">
            </comment>
        </div>
        
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'
import Comment from "./AComment.vue"
    export default {
        name: "a-tweet",
        components: {
            Comment,
        },
        props: {
            tweet: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                token: cookies.get("loginToken"),
                ifLike: false,
                likeNum: "",
                display: false,
                comments: [],
                commentNum: ""
            }
        },
        methods: {
            updateTweet: function() {
               cookies.set("userTweetId", this.tweet.id);
               this.$router.push("Tweet")
            },
            deleteTweet: function() {
                axios.request({
                   url: "http://127.0.0.1:5000/tweets",
                   method: "DELETE",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   data: {
                       id: this.tweet.id,
                       token: this.token
                   }
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                }) 
            },
            createComment: function() {
                cookies.set("tweetUsername", this.tweet.username);
                cookies.set("tweetTime", this.tweet.created_at);
                cookies.set("tweetTweetId", this.tweet.id);
                cookies.set("tweetContent", this.tweet.content);
                this.$router.push("Comment")
            },
            getComments: function() {
                axios.request({
                url: "http://127.0.0.1:5000/comments",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    tweet_id: this.tweet.id
                }
                }).then((response) => {
                    console.log(response.data);
                    this.commentNum = response.data.length;
                    this.comments = response.data;
                    console.log(this.comments);
                }).catch((error) => {
                    console.log(error)
                })
            }, 
            viewComments: function() {
                this.display =! this.display;
            },
            getLike: function() {
                axios.request({
                url: "http://127.0.0.1:5000/tweet-likes",
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
                params: {
                    tweet_id: this.tweet.id,
                }
                }).then((response) => {
                    console.log(response.data);
                    this.likeNum = response.data.length;
                    for(let i=0; i<response.data.length; i++) {
                    if(response.data[i].username == cookies.get("userName")) {
                    this.ifLike = true;
                    return
                    }
                    this.ifLike = false;
                }
                }).catch((error) => {
                console.log(error)
                })
            },
            createLike: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/tweet-likes",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                       token: this.token,
                       tweet_id: this.tweet.id
                    }
                }).then((response) => {
                    console.log(response.data);
                    this.ifLike = true;
                    this.getLike();
                }).catch((error) => {
                    console.log(error)
                });
            },
            deleteLike: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/tweet-likes",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: this.token,
                        tweet_id: this.tweet.id
                    }
                }).then((response) => {
                    console.log(response);
                    this.ifLike = false;
                    this.getLike();
                }).catch((error) => {
                    console.log(error)
                });
            }  
        },  
        mounted () {
            this.getComments();
            this.getLike();
            this.$store.dispatch("getAllTweets");
        },
        computed: {
            logUser() {
                return cookies.get('userName') 
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

#tweet-unit {
    min-height: 5vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#container-1 {
    width: 100%;
    height: 5vh;
    grid-template-columns: 30% 50% 20%;
    display: grid;
    justify-items: center;
    align-items: center; 
    background-color:  #E1E8ED;
    border-bottom: 1px solid #1DA1F2;
    margin-top: 0.5em;

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem; 
        color: #657786;
    }
}

#container-2 {
    width: 100%;
    min-height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 0.5em;
    

    p {
    width: 90%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    }
}

#container-3 {
    width: 100%;
    height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 1em;
    grid-template-columns: 5% repeat(4, 1fr) 5%;
    

    #unit-1 {
        height: 100%;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr;

        img {
            width: 20px;
        }

        h5 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
        }
    }
    
    #unit-2 {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr;

        #like-active {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
            font-weight: bold;
        }
        
        img {
            width: 20px;
        }
    }

    #unit-3 {
    width: 100%;
    height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr; 

        img {
            width: 20px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            border: none;
            border-bottom: 1px solid #657786;
            background-color: white;
        }
    }   
}

#container-4 {
    width: 100%;
    min-height: 30vh;
    display: grid;
    justify-items: center;
    align-items: center; 
}

</style>