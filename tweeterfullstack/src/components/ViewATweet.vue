<template>
    <div class="tweet-unit">
        <div class="container-1">
            <h3>{{ tweet.username }}</h3>
            <h4>{{ tweet.created_at }}</h4>
            <div></div>
        </div>
        <div class="container-2">
            <p>{{ tweet.content }}</p>
        </div>
        <div class="container-3">
            <div></div>
            <div class="unit-1">
                <h5 @click="viewComments">{{ commentNum }}</h5>
                <img @click="createComment" src="https://www.kindpng.com/picc/m/153-1537658_twitter-comment-icon-png-clipart-png-download-topic.png" alt="tweeter comment icon">
            </div>
            <div class="unit-2">
                <span class="number">{{ likeNum }}</span>
                <img src="https://www.pngitem.com/pimgs/m/77-770619_leave-a-reply-cancel-reply-twitter-like-icon.png" alt="tweeter like icon" v-if="ifLike" @click="deleteLike">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-xxei2BZj50qLOyvtuvF7s3RmxqMPoT9wNg&usqp=CAU" alt="tweeter unlike icon" v-else @click="createLike">
            </div>
            <div class="unit-3">
                <img v-if="tweet.username == logUser" @click="updateTweet" src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png" alt="tweeter update icon">
                <img v-if="tweet.username == logUser" @click="deleteTweet" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&usqp=CAU" alt="tweeter delete icon">
            </div>
            <div class="unit-4">
                <span class="number">{{ retweetNum }}</span>
                <img v-if="retweetStatus == true" @click="retweetChoice" src="https://lh3.googleusercontent.com/proxy/GQphO5RtcWhE5Zk_lJ1EwVZzuAGcbH_3_8_c3GoXzgoVeq2_b_hod4WzUYa1yeARrlTNtcunvi5mVM-NZd39quDkyAu_ARGyPx8srKS1luGXiFBV_uY56SU22O0IKg" alt="retweet">
                <img v-else @click="retweetChoice" src="https://static.thenounproject.com/png/1459244-200.png" alt="untweet">
            </div>
            <div></div>
        </div>
        <div class="container-4" v-if="display == true">
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
                commentNum: "",
                retweetNum: "",
                retweetStatus: false
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
            },
            // getRetweet: function() {
            //     axios.request({
            //     url: "http://127.0.0.1:5000/retweets",
            //     method: "GET",
            //     headers: {
            //     "Content-Type": "application/json",
            //     },
            //     params: {
            //         user_id: cookies.get("userId"),
            //     }
            //     }).then((response) => {
            //         console.log(response.data);
            //         for(let i=0; i<response.data.length; i++) {
            //             if(response.data[i].tweet_id == this.tweet.id) {
            //                 this.retweetNum = response.data.retweet_amount;
            //                 console.log(this.retweetNum)
            //             }
            //         }
            //     }).catch((error) => {
            //         console.log(error)
            //     })
            // }, 
            retweetCheck: function() {
                for(let i=0; i<this.$store.state.retweets.length; i++) {
                    if(this.tweet.id == this.$store.state.retweets[i].tweet_id) {
                        this.retweetNum = this.$store.state.retweets[i].retweet_amount
                        this.retweetStatus = true;
                        return
                    } 
                }
                this.retweetStatus = false;
            },
            createRetweet: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/retweets",
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
                    this.retweetStatus = true;
                    this.retweetNum++
                    this.$store.dispatch("getAllRetweets");
                }).catch((error) => {
                    console.log(error)
                });
            },
            deleteRetweet: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/retweets",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: cookies.get("loginToken"),
                        tweet_id: this.tweet.id
                    }
                }).then((response) => {
                    console.log(response);
                    this.retweetStatus = false;
                    this.retweetNum--
                    this.$store.dispatch("getAllRetweets");
                }).catch((error) => {
                    console.log(error);
                })
            },
            retweetChoice: function() {
               if(this.retweetStatus == true) {
                   return this.deleteRetweet();
               }else if(this.retweetStatus == false) {
                   return this.createRetweet();
               }
           } 
        },  
        mounted () {
            this.getComments();
            this.getLike();
            this.$store.dispatch("getAllTweets");
            this.$store.dispatch("getAllRetweets");
            this.retweetCheck()
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

.tweet-unit {
    min-height: 5vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

.container-1 {
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

.container-2 {
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

.container-3 {
    width: 100%;
    height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 1em;
    grid-template-columns: 5% repeat(4, 1fr) 5%;
    

    .unit-1 {
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
    
    .unit-2 {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr;

        .number {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
            font-weight: bold;
        }
        
        img {
            width: 20px;
        }
    }

    .unit-3 {
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

    .unit-4 {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr;

        .number {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
            font-weight: bold;
        }
        
        img {
            width: 20px;
        }
    }
}

.container-4 {
    width: 100%;
    min-height: 30vh;
    display: grid;
    justify-items: center;
    align-items: center; 
}

</style>