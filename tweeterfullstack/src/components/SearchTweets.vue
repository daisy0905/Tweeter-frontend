<template>
    <div>
       <view-a-tweet class="tweets" v-for="tweet in searchTweets" :key="tweet.id" :tweet="tweet"></view-a-tweet>
    </div>
</template>

<script>
import ViewATweet from "./ViewATweet.vue"
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        name: "search-tweets",
        components: {
            ViewATweet
        },
        data() {
            return {
                searchTweets: [],
                content: cookies.get("tweetContent")
            }
        },
        methods: {
            getSearchTweets: function() {
                axios.request({
                url: "http://127.0.0.1:5000/tweets",
                   method: "GET",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   params: {
                       content: this.content
                   }
                }).then((response) => {
                    console.log(response);
                    this.searchTweets = response.data;
                }).catch((error) => {
                    console.log(error);
                }) 
            },
        },
        mounted () {
            this.getSearchTweets();
        },
    }
</script>

<style lang="scss" scoped>
.tweets {
    min-height: 5vh;
    width: 90%;
}
</style>