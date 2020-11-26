<template>
    <div id="userIntro">
        <div id="container-1">
            <img @click="backToProfile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvz8HF_jjIpaNgkrFzcw9E2N9Y6SA13DfCcQ&usqp=CAU" alt="icon of back to home page">
            <h3>Edit Profile</h3>
            <div></div>
            <button @click="updateProfile">Update</button>
        </div>
        <div id="container-2">
            <img src="../assets/background-landing.png" alt="cover image">
        </div>
        <div id="container-3">
            <img :src="UserPhoto" alt="user image">       
        </div>
        <div id="user-profile">
            <h3>Email</h3>
            <input :placeholder="email" type="text" id="email-input" class="input" v-model="emailInput">
            <h3>Username</h3>
            <input :placeholder="username" type="text" id="username-input" class="input" v-model="usernameInput">
            <h3>Bio</h3>
            <input :placeholder="bio" type="text" id="bio-input" class="input" v-model="bioInput">
            <h3>Birthdate</h3>
            <input :placeholder="birthdate" type="text" id="birthdate-input" class="input" v-model="birthdateInput">
            <h3>Password</h3>
            <input :placeholder="password" type="text" id="password-input" class="input" v-model="passwordInput">
            <h3>Image</h3>
            <input :placeholder="image" type="text" id="image-input" class="input" v-model="imageInput">
        </div>
        <h3>{{ loginStatus }}</h3>
    </div>
</template>

<script>
import profileApi from 'axios'
import cookies from 'vue-cookies'

    export default {
        data() {
            return {
                emailInput: this.email,
                usernameInput: this.username,
                bioInput: this.bio,
                birthdateInput: this.birthdate,
                passwordInput: this.password,
                imageInput: this.image,
                token: cookies.get("loginToken"),
                loginStatus: "",
                UserPhoto: cookies.get("userImage")
            }
        },

        computed: {
            email: function() {
                return this.$store.state.user.email
            },
            username: function() {
                return this.$store.state.user.username
            },
            bio: function() {
                return this.$store.state.user.bio
            },
            birthdate: function() {
                return this.$store.state.user.birthdate
            },
            password: function() {
                return this.$store.state.user.password
            },
            image: function() {
                return this.$store.state.user.image
            }
        },

        methods: {
            updateProfile: function() {
                profileApi.request({
                    url: "http://127.0.0.1:5000/users",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        email: this.emailInput,
                        username: this.usernameInput,
                        bio: this.bioInput,
                        birthdate: this.birthdateInput,
                        password: this.passwordInput,
                        image: this.imageInput,
                        token: this.token
                    }
                }).then((response) => {
                    console.log(response);
                    this.loginStatus = "Success";
                }).catch((error) => {
                    console.log(error);
                    this.loginStatus = "Error";
                })
            },
            backToProfile: function() {
                this.$router.push("Profile");
                this.$store.dispatch("getProfile");
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

#userIntro {
    min-height: 100vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#container-1 {
    min-height: 5vh;
    width: 100%;
    display: grid;
    justify-items: left;
    align-items: center;
    grid-template-columns: 10% 30% 40% 20%;

    img {
        width: 5vw;
    }

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        text-align: left;
    }

    button {
        width: 20vw;
        height: 5vh;
        background-color: #1DA1F2;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border: none;
        border-radius: 1.5em;
        font-weight: bold;
        margin-right: 3em;
    }
}

#container-2 {
    min-height: 20vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    img {
        width: 100%;
        height: 20vh;
        object-fit: cover;
    }
}

#container-3 {
    min-height: 10vh;
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    position: relative;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        display: grid;
        justify-items: left;
        align-items: center;
        margin-left: 1em;
        position: absolute;
        top: -5vh;
        border: 2px solid white;
    }
}

#user-profile {
    min-height: 60vh;
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
}

</style>