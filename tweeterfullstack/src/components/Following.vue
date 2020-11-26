<template>
    <div id="following">
        <div></div>
        <div id="container-1">
            <h3>{{ follow.username }}</h3>
            <p>{{ follow.bio }}</p>
        </div>
        <!-- <div id="container-3">
            <button id="following-btn">Following</button>
        </div> -->
        <follow :userId="follow.user_id"></follow>
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
    grid-template-columns: 10% 60% 30%;
    border-bottom: 1px solid #E1E8ED;
}

#container-1 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: left;
    align-items: center;

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        }

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: left;
    }
}

#container-3 {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    #following-btn {
        width: 25vw;
        height: 5vh;
        background-color: #1DA1F2;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border-radius: 1.5em;
        font-weight: bold;
        border: none;
    }
}

</style>