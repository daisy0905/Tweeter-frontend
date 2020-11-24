<template>
    <div id="signup-form">
        <h3>Username</h3>
        <input type="text" id="username-input" class="input" v-model="username">
        <h3>Password</h3>
        <input type="password" id="password-input" class="input" v-model="password">
        <h3>Birthdate</h3>
        <input :placeholder="birthdate" type="text" id="birthdate-input" class="input" v-model="birthdate">
        <h3>Bio</h3>
        <textarea id="bio-input" class="input" v-model="bio"></textarea>
        <h3>Email</h3>
        <input type="text" id="email-input" class="input" v-model="email">
        <p>User Image URL</p>
        <input type="text" id="image-input" class="input" v-model="image">
        <button class="btn" @click="signup">Sign Up</button>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name: "signup-form",
        data() {
            return {
                username: "",
                password: "",
                birthdate: "YYYY-MM-DD",
                bio: "",
                email: "",
                image: ""
            }
        },
        methods: {
            signup: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/users",
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    data: {
                        password: this.password,
                        username: this.username,
                        birthdate: this.birthdate,
                        bio: this.bio,
                        email: this.email,
                        image: this.image
                    }
                }).then((response) => {
                   console.log(response);
                   this.$router.push("/");
                }).catch((error) => {
                   console.log(error)
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

#signup-form {
    min-height: 80vh;
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
        height: 7vh;
        background-color: #E1E8ED;
        border: 1px solid #AAB8C2;
        margin: 0 0 1em 0;
        border-bottom: 1px solid #1DA1F2;
        text-align: center;
    }

    .btn {
        width: 80%;
        height: 7vh;
        border: 1px solid #1DA1F2; 
        border-radius: 1.5em;
        background-color: white;
        font-size: 1rem;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: #1DA1F2;

        :hover {
            background-color: #1DA1F2;
            color: white;
        }
    }
}
</style>