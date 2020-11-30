<template>
    <div id="login-area">
        <h3>username</h3>
        <input type="text" id="username-input" class="input" v-model="username">
        <h3>Password</h3>
        <input type="text" id="password-input" class="input" v-model="password">
        <button class="btn" @click="login">Log in</button>
        <h3>{{ loginStatus }}</h3>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name: "login-form",
        data() {
            return {
                username: "",
                password: "",
                loginStatus: ""
            }
        },
        methods: {
            login: function() {
                this.loginStatus = "Loading"
                axios.request({
                    url: "http://127.0.0.1:5000/login",
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "NvrMZ9Fj0jRrjYf2As0M7gpnhYC7k4ltci5mZkZGGeY2G"
                    },
                    data: {
                       username: this.username,
                       password: this.password
                    }
                }).then((response) => {
                    console.log(response);
                    this.loginStatus = "Success";
                    cookies.set("loginToken", response.data.loginToken);
                    cookies.set("userId", response.data.id);
                    cookies.set("userName", response.data.username);
                    cookies.set("userImage", response.data.image);
                    cookies.set("userBio", response.data.bio);
                    cookies.set("userCreation", response.data.created_at);
                    cookies.set("userBirthdate", response.data.birthdate);
                    cookies.set("userEmail", response.data.email);
                    this.$store.dispatch("getAllUsers");
                    this.$store.dispatch("getAllTweets");
                    this.$store.dispatch("getUserFollowing");
                    // if(this.$store.state.follows.length != "null") {
                    //     this.loginStatus = "Success!"
                    //     this.$router.push("/home")
                    // }
                    setTimeout(()=>{this.$router.push("/home")}, 4000);
                }).catch((error) => {
                    console.log(error);
                    this.loginStatus = "Error";
                }) 
            },
        }
    }
</script>

<style lang="scss" scoped>
#login-area {
    min-height: 40vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 1rem;
    }

    .input {
        width: 80%;
        height: 8vh;
        background-color: #E1E8ED;
        border: 1px solid #AAB8C2;
        margin: 0 0 1em 0;
        border-bottom: 1px solid #1DA1F2;
        text-align: center;
    }

    .btn {
        width: 80%;
        height: 7vh;
        background-color: #1DA1F2;
        border-radius: 1.5em; 
        border: none;
        font-size: 1rem;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        font-weight: bold;
    }
}
</style>