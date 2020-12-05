<template>
    <div class="following">
        <div class="container-1">
            <img :src="follow.image" alt="users the loged in user follows">
        </div>
        <div class="container-2">
            <h3>{{ follow.username }}</h3>
            <p>Birthdate: {{ follow.birthdate }}</p>
            <p>Bio: {{ follow.bio }}</p>
            <p>Email: {{ follow.email }}</p>
        </div>
        <follow v-if="name== logUser" :userId="follow.follow_id" class="container-3"></follow>
    </div>
</template>

<script>
import Follow from './Follow.vue'
import cookies from 'vue-cookies'

    export default {
        name: "following",
        components: {
            Follow,
        },
        data() {
            return {
                name: cookies.get("name"),
                logUser: cookies.get("userName")
            }
        },
        props: {
            follow: {
                type: Object,
                required: true
            },
            userId: {
                type: Number
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

.following {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
    grid-template-columns: 20% 50% 30%;
    border-bottom: 1px solid #E1E8ED;
    margin: 0 0 1em 0;
}

.container-1 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: left;
    align-items: center; 

    img {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
}

.container-2 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: left;
    align-items: center;

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        text-align: left;
        }

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: left;
    }
}

.container-3 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
}

</style>