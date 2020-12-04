<template>
    <div class="retweet">
        <div class="container-1">
            <h3>{{ retweet.name }}</h3>
            <h4>{{ retweet.createdAt }}</h4>
            <div></div>
        </div>
        <div class="container-2">
            <h3>{{ retweet.username }}</h3>
            <h4>{{ retweet.created_at }}</h4>
            <div class="unit-1">
                <img v-if="retweet.user_id == logId" @click="deleteRetweet" src="../assets/retweet-icon.png" alt="retweet icon">
            </div>
        </div>
        <div class="container-3">
            <img :src="retweet.image" alt="the image of retweet">
            <p>{{ retweet.content }}</p>
        </div>
        <div class="container-4" v-if="display == true">
            <p>{{ status }}</p>
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'
    export default {
        name: "aretweet",
        props: {
            retweet: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                token: cookies.get("loginToken"),
                display: false,
                status: "", 
            }
        },
        methods: {
            deleteRetweet: function() {
                this.display =! this.display; 
                axios.request({
                    url: "http://127.0.0.1:5000/retweets",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: cookies.get("loginToken"),
                        tweet_id: this.retweet.tweet_id
                    }
                }).then((response) => {
                    console.log(response);
                    this.status = "Deleted!";
                    this.$emit("deleteRetweet", this.retweet.id)
                }).catch((error) => {
                    console.log(error);
                    this.status = "Failed!";
                })
            },
        },
        computed: {
            logId() {
                return cookies.get('userId') 
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
.retweet {
    min-height: 5vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 
    background-color: white;
    z-index: 30;
    padding-bottom: 1em;
    margin: 0.5em 0 0 0;
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
    width: 90%;
    height: 5vh;
    grid-template-columns: 30% 50% 20%;
    display: grid;
    justify-items: center;
    align-items: center; 
    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        color: #657786;
    }

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        color: #657786; 
    }

    .unit-1 {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        img {
            width: 20px;
        }
    }
}

.container-3 {
    width: 80%;
    min-height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 0.5em;

    img {
        width: 100%;
        border-radius: 2em 2em 0 0;
    }

    p {
        width: 100%;
        height: 10vh;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        padding: 0.5em 0 0 0.5em;
        background-color: lightgrey;
        border-radius: 0 0 2em 2em;
    }
}

.container-4 {
    p {
        width: 90%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
    }
}
</style>