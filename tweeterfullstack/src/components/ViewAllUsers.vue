<template>
    <div id="users">
        <div id="user" v-for="user in users" :key="user.id">
            <div id="container-1">
                <img @click="viewOtherUser" :src="user.image" alt="user image">
            </div>
            <div id="container-2">
                <h3>{{ user.username }}</h3>
                <p>{{ user.bio }}</p>
                <follow :userId="user.id"></follow>
            </div>
        </div>
    </div>
</template>

<script>
import Follow from './Follow.vue'
import cookies from 'vue-cookies'

    export default {
        name: "view-all-users",
        components: {
            Follow
        },
        methods: {
            viewOtherUser: function() {
                cookies.set("otherId", this.user.id),
                this.$router.push("OtherProfile")
            }
        },
        computed: {
            users: function() {
                return this.$store.state.users
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

.users {
    min-height: 40vh;
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center; 
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