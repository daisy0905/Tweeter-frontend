<template>
    <div id="comments">
        <h5 @click="getComments">{{ commentNum }}</h5>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                comments: [],
                commentNum: "",
            }
        },
        props: {
            tweetId: {
                type: Number,
                required: true
            }
        },
        getComments: function() {
            axios.request({
                url: "https://daisyfulltweeter.ml/api/comments",
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
                params: {
                    tweet_id: this.tweetId
                }
            }).then((response) => {
                console.log(response.data);
                this.commentNum = response.data.length;
                this.comments = response.data;
                console.log(this.comments);
            }).catch((error) => {
                console.log(error)
            })
        }
    }
</script>

<style lang="scss" scoped>
#comments {
    min-height: 5vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 

    h5 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        color: #AAB8C2;
    }
}
</style>