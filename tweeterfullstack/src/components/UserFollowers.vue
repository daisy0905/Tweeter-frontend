<template>
    <div>
        <follower class="followers" v-for="follower in userfollowers" :key="follower.user_id" :follower="follower">

        </follower>
    </div>
</template>

<script>
import Follower from './Follower'

    export default {
        name: "followings",
        components: {
            Follower
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