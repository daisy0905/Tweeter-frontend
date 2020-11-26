<template>
    <div>
        <follower class="followers" v-for="follower in followers" :key="follower.user_id" :follower="follower">

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
            followers: function() {
                return this.$store.state.followers
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