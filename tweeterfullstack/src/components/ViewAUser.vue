<template>
    <div id="user">
        <div id="container-1">
            <img id="profile" @click="getProfile" :src="user.image" alt="user image">
        </div>
        <div id="container-2">
            <h3>{{ user.username }}</h3>
            <p>{{ user.bio }}</p>
            <follow :userId="user.id"></follow>
        </div>
    </div>
</template>

<script>
import Follow from './Follow.vue'
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        name: "view-a-user",
        components: {
            Follow,
        },
        props: {
            user: {
                type: Object,
                required: true
            } 
        },
        methods: {
            getProfile: function() {
                axios.request({
                url: "http://127.0.0.1:5000/users",
                   method: "GET",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   params: {
                       id: this.user.id
                   }
                }).then((response) => {
                    console.log(response);
                    cookies.set("name", response.data[0].username)
                    cookies.set("bio", response.data[0].bio)
                    cookies.set("birthdate", response.data[0].birthdate)
                    cookies.set("created_at", response.data[0].created_at)
                    cookies.set("image", response.data[0].image)
                    cookies.set("otherId", response.data[0].id)
                    // this.$store.dispatch("getFollowing");
                    setTimeout(()=>{this.$router.push("/profile")}, 3000);
                }).catch((error) => {
                    console.log(error);
                })
            },
        },
        computed: {
            users: function() {
                return this.$store.state.users
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

#user {
    height: 35vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 
    border: 1px solid #AAB8C2;
    border-radius: 2em;
    grid-template-rows: 30% 70%;
    row-gap: 1vh;
    margin: 0.5em;
}

#container-1 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    margin-top: 0.5em;

    img {
        width: 50%;
        object-fit: cover;
        border-radius: 50%;

    }
}

#container-2 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-rows: 1fr 1.5fr 1.5fr;
    position: relative;

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }

    p {
        margin: 0 0.5em 0 0.5em;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
    }
}
</style>