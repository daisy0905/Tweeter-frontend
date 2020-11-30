<template>
    <div>
        <user-following class="followings" v-for="follow in userfollows" :key="follow.follow_id" :follow="follow"></user-following>
    </div>
</template>

<script>
import UserFollowing from './UserFollowing.vue'

    export default {
        name: "followings",
        components: {
            UserFollowing
        },
        computed: {
            userfollows: function() {
                return this.$store.state.userFollows
            }
        }
    }
</script>

<style lang="scss" scoped>
.followings {
    min-height: 15vh;
    width: 100%;
}
</style>