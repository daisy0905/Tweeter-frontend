<template>
    <div class="retweet">
        <div class="container-1">
            <h3>{{ retweet.name }}</h3>
            <!-- <h4>{{ tweet.created_at }}</h4> -->
            <div></div>
        </div>
        <div class="container-2">
            <h3>{{ retweet.username }}</h3>
            <h4>{{ retweet.created_at }}</h4>
        </div>
        <div class="container-3">
            <p>{{ retweet.content }}</p>
            <div class="unit-1">
                <img @click="createRetweet" src="https://static.thenounproject.com/png/1459244-200.png" alt="retweet icon">
            </div>
            <div class="unit-1" v-if="retweet.username == logUser">
                <img @click="deleteRetweet" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&usqp=CAU" alt="delete icon">
            </div>
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
                }).catch((error) => {
                    console.log(error);
                    this.status = "Failed!";
                })
            },
            createRetweet: function() {
                this.display=! this.display; 
                axios.request({
                    url: "http://127.0.0.1:5000/retweets",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: cookies.get("loginToken"),
                        tweet_id: this.retweet.tweet_id
                    }
                }).then((response) => {
                    console.log(response);
                    this.status = "Retweet!";
                }).catch((error) => {
                    console.log(error);
                    this.status = "Failed!";
                })
            },

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
    grid-template-columns: 40% 60%;
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
}

.container-3 {
    width: 100%;
    height: 10vh;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 80% 10% 10%; 
    border: 1px solid #1DA1F2;
    border-radius: 1em;
    padding: 1em 0 1em 0;
    
    p {
        width: 90%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
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

.container-4 {
    p {
        width: 90%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
    }
}
</style>