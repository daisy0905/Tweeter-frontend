<template>
    <div>
       <view-a-tweet class="tweets" v-for="tweet in tweetList" :key="tweet.id" :tweet="tweet"></view-a-tweet>
    </div>
</template>

<script>
import ViewATweet from "./ViewATweet.vue"

    export default {
        name: "view-all-tweets",
        components: {
            ViewATweet
        },
        computed: {
            tweetList: function() {
                return this.$store.state.tweetList;
            }
        }
    }
</script>

<style lang="scss" scoped>
.tweets {
    min-height: 5vh;
    width: 90%;
}
</style>