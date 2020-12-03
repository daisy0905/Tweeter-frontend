<template>
    <div>
        <user-follower class="followers" v-for="follower in userfollowers" :key="follower.user_id" :follower="follower"></user-follower>
    </div>
</template>

<script>
import UserFollower from './UserFollower'

    export default {
        name: "followings",
        components: {
            UserFollower
        },
        computed: {
            userfollowers: function() {
                return this.$store.state.userFollowers
            }
        }
    }
</script>

<style lang="scss" scoped>
.followers {
    min-height: 15vh;
    width: 90%;
}
</style>