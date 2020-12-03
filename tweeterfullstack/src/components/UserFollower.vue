<template>
    <div class="follower">
       <div class="container-1">
            <img :src="follower.image" alt="users the loged in user follows">
        </div>
        <div class="container-2">
            <h3>{{ follower.username }}</h3>
            <p>{{ follower.bio }}</p>
        </div>
        <div></div>
    </div>
</template>

<script>

    export default {
        name: "follower",
        props: {
            follower: {
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

.follower {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
    grid-template-columns: 20% 80%;
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

</style>