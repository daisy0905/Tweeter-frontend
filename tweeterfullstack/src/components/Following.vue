<template>
    <div id="following">
        <div id="container-1">
            <img :src="follow.image" alt="users the loged in user follows">
        </div>
        <div id="container-2">
            <h3>{{ follow.username }}</h3>
            <p>Birthdate: {{ follow.birthdate }}</p>
            <p>Bio: {{ follow.bio }}</p>
            <p>Email: {{ follow.email }}</p>
        </div>
        <!-- <div id="container-3">
            <button id="following-btn">Following</button>
        </div> -->
        <follow :userId="follow.follow_id" id="container-3"></follow>
    </div>
</template>

<script>
import Follow from './Follow.vue'

    export default {
        name: "following",
        components: {
            Follow,
        },
        props: {
            follow: {
                type: Object,
                required: true
            },
            userId: {
                type: Number
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

#following {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
    grid-template-columns: 20% 50% 30%;
    border-bottom: 1px solid #E1E8ED;
    margin: 0 0 1em 0;
}

#container-1 {
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

#container-2 {
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

// #container-3 {
//     height: 100%;
//     width: 100%;
//     display: grid;
//     justify-items: center;
//     align-items: center;

//     #following-btn {
//         width: 25vw;
//         height: 5vh;
//         background-color: #1DA1F2;
//         color: white;
//         font-family: Arial, Helvetica, sans-serif;
//         font-size: 0.8rem;
//         border-radius: 1.5em;
//         font-weight: bold;
//         border: none;
//     }
// }

#container-3 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
}

</style>