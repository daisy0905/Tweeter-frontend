<template>
    <div id="delete-profile">
        <h3>Please input your password</h3>
        <input type="password" id="password-input" v-model="password">
        <button @click="deleteProfile">Confirm</button>
        <h3>{{ status }}</h3>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        name: "delete-profile",
        data() {
            return {
                password: "",
                token: cookies.get("loginToken"),
                status: ""
            }
        },
        methods: {
            deleteProfile: function() {
                this.Status = "Loading"
                axios.request({
                   url: "https://daisyfulltweeter.ml/api/users",
                   method: "DELETE",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   data: {
                       token: this.token,
                       password: this.password
                   }
                }).then((response) => {
                    console.log(response);
                    this.status = "Account has been deleted!";
                    cookies.remove("loginToken");
                    cookies.remove("userId");
                    cookies.remove("tweetContent");
                    cookies.remove("tweetTweetId");
                    cookies.remove("userCommentId");
                    cookies.remove("userName");
                    cookies.remove("otherId");
                    cookies.remove("tweetUsername");
                    cookies.remove("tweetTime");
                    cookies.remove("userImage");
                    cookies.remove("userCreation");
                    cookies.remove("userTweetId");
                    cookies.remove("userEmail");
                    cookies.remove("tweetTime");
                    cookies.remove("userBio");
                    cookies.remove("userBirthdate");
                    cookies.remove("image");
                    cookies.remove("bio");
                    cookies.remove("name");
                    cookies.remove("birthdate");
                    cookies.remove("created_at");
                    setTimeout(()=>{this.$router.push("/")}, 2000);
                }).catch((error) => {
                    console.log(error);
                    this.status = "Error";
                }) 
            }
        }
    }
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#delete-profile {
    height: 15vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
    border: 1px solid #1DA1F2;
    border-radius: 1em;

    #password-input {
        margin: 0.5em;
        width: 80%;
        height: 5vh;
        background-color: #E1E8ED;
        border: 1px solid #AAB8C2;
        border-bottom: 1px solid #1DA1F2;
        text-align: center;
    }

    button {
        width: 50%;
        height: 5vh;
        background-color: #1DA1F2;
        border-radius: 1.5em; 
        border: none;
        font-size: 1rem;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
    }

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        color: #1DA1F2;
    }
}
</style>