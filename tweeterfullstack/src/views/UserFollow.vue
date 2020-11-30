<template>
    <div id="following">
        <div id="container-1">
            <img @click="backToIntro" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvz8HF_jjIpaNgkrFzcw9E2N9Y6SA13DfCcQ&usqp=CAU" alt="icon of back to home page">
            <h3>{{ name }}</h3>
            <div></div>
            <button @click="refresh">Refresh</button>
        </div>
        <div id="container-2">
            <div class="user-follow">
                <div></div>
                <h5>{{ followingNum }}</h5>
                <h4 @click="getFollowing">Following</h4>
                <div></div>
            </div>
            <div class="user-follow">
                <div></div>
                <h5>{{ followerNum }}</h5>
                <h4 @click="getFollower">Follower</h4>
                <div></div>
            </div>
        </div>
        <user-followings class="follow" v-if="follow == true"></user-followings>
        <user-followers class="follow" v-else-if="follow == false"></user-followers>
    </div>
</template>

<script>
import UserFollowings from '../components/UserFollowings.vue'
import UserFollowers from '../components/UserFollowers.vue'
import cookies from 'vue-cookies'

    export default {
        components: {
            UserFollowings,
            UserFollowers
        },
        data() {
            return {
                follow: true,
                name: cookies.get("userName")
            }
        },
        methods: {
            refresh: function() {
                this.$store.dispatch("getUserFollowing");
                this.$store.dispatch("getUserFollower");
            },
            getFollowing: function() {
                this.follow = true;
            },
            getFollower: function() {
                this.follow = false;
            },
            backToIntro: function() {
                this.$router.push("/userintro")
            }
        },
        computed: {
            followingNum: function() {
                return this.$store.state.userFollows.length;
            },
            followerNum: function() {
                return this.$store.state.userFollowers.length;
            },
        },
        mounted () {
            this.$store.dispatch("getUserFollowing");
            this.$store.dispatch("getUserFollower");
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

#following {
    min-height: 30vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center; 
}

#container-1 {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: left;
    align-items: center;
    grid-template-columns: 10% 15% 45% 30%;
    margin-bottom: 1em;

    img {
        width: 5vw;
    }

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }

    button {
        width: 25vw;
        height: 5vh;
        background-color: white;
        color: #1DA1F2;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        border: 1px solid  #1DA1F2;
        border-radius: 1.5em;
        font-weight: bold;
    }
}

#container-2 {
    height: 5vh;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;


    .user-follow {
        height: 5vh;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr 1.5fr 1fr;

        h5 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
        }

        h4 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #1DA1F2;
        }
    }
}

.follow {
    min-height: 50vh;
}
</style>