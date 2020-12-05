<template>
    <div class="retweet-check">
        <span class="number">{{ retweetNum }}</span>
        <div class="retweet-btn">
            <img v-if="retweetStatus == true " @click="retweetChoice" src="../assets/retweet-icon.png" alt="retweet">
            <img v-else  @click="retweetChoice" src="https://static.thenounproject.com/png/1459244-200.png" alt="untweet">
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        name: "retweet-btn",
        data() {
            return {
                retweetStatus: false,
                token: cookies.get("loginToken"),
                retweetNum: 0,
                userId: cookies.get("userId")
            }
        },
        props: {
            tweetId: {
                type: Number,
                required: true
            },

        },
        methods: {
            retweetCheck: function() {
                this.$store.dispatch("getAllRetweets");
                for(let i=0; i<this.$store.state.retweets.length; i++) {
                    if(this.tweetId == this.$store.state.retweets[i].tweet_id) {
                        this.retweetNum = this.$store.state.retweets[i].retweet_amount
                    } 
                }
            },
            userCheck: function() {
                this.$store.dispatch("getAllRetweets")
                for(let i=0; i<this.$store.state.retweets.length; i++) {
                    if(this.userId == this.$store.state.retweets[i].user_id && this.tweetId == this.$store.state.retweets[i].tweet_id) {
                        this.retweetStatus = true;
                        return
                    } 
                    this.retweetStatus = false;
                }
            },
            createRetweet: function() {
                axios.request({
                    url: "https://daisyfulltweeter.ml/api/retweets",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                       token: this.token,
                       tweet_id: this.tweetId
                    }
                }).then((response) => {
                    console.log(response.data);
                    this.retweetStatus = true;
                    this.retweetNum++;
                }).catch((error) => {
                    console.log(error)
                });
            },
            deleteRetweet: function() {
                axios.request({
                    url: "https://daisyfulltweeter.ml/api/retweets",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: cookies.get("loginToken"),
                        tweet_id: this.tweetId
                    }
                }).then((response) => {
                    console.log(response);
                    this.retweetStatus = false;
                    this.retweetNum--;
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
            this.$store.dispatch("getAllRetweets");
            setTimeout(()=>{this.retweetCheck()}, 3000);
            this.userCheck();
        }

    }
</script>

<style lang="scss" scoped>
.retweet-check {
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    .number {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
            font-weight: bold;
        }

    .retweet-btn {
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
</style>