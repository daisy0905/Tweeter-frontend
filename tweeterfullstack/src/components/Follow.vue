<template>
    <div id="button-container">
        <button v-if="userFollow == true" @click="followChoice" id="follow-btn">Following</button>
        <button v-else @click="followChoice" id="following-btn">Follow</button>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'
    export default {
        name: "follow",
        props: {
            userId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                userFollow: true,
                token: cookies.get("loginToken"),
            }
        },
        methods: {
            followCheck: function() {
                console.log(this.$store.state.userFollows)
                for(let i=0; i<this.$store.state.userFollows.length; i++) {
                    if(this.userId == this.$store.state.userFollows[i].follow_id) {
                        this.userFollow = true;
                        return
                    } 
                }
                this.userFollow = false;
            },
            createFollow: function() {
                axios.request({
                    url: "https://daisyfulltweeter.ml/api/follows",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                       token: this.token,
                       follow_id: this.userId
                    }
                }).then((response) => {
                    console.log(response);
                    this.userFollow = true;
                }).catch((error) => {
                   console.log(error)
                })
            },
            deleteFollow: function() {
                axios.request({
                    url: "https://daisyfulltweeter.ml/api/follows",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                       token: this.token,
                       follow_id: this.userId
                    }
                }).then((response) => {
                    console.log(response);
                    this.userFollow = false;
                }).catch((error) => {
                    console.log(error)
                })
            },
            followChoice: function() {
               if(this.userFollow == true) {
                   return this.deleteFollow();
               }else if(this.userFollow == false) {
                   return this.createFollow();
               }
           }
        },
        mounted () {
            this.followCheck();
        }
    }
</script>

<style lang="scss" scoped>
    #button-container {
        width: 70%;
        height: 5vh;

        #following-btn {
            width: 100%;
            height: 100%;
            background-color: white;
            color: #1DA1F2;
            border: 1px solid #1DA1F2;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            border-radius: 1.5em;
            font-weight: bold;
        }

        #follow-btn {
            width: 100%;
            height: 100%;
            background-color: #1DA1F2;
            color: white;
            border: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            border-radius: 1.5em;
            font-weight: bold;
        }
    }
</style>
