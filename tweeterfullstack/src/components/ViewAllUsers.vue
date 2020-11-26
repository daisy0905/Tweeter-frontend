<template>
    <div>
        <view-a-user class="users" v-for="user in users" :key="user.id" :user="user">
        </view-a-user>
    </div>
</template>

<script>
import ViewAUser from './ViewAUser.vue'

    export default {
        name: "all-users",
        components: {
            ViewAUser
        },
        computed: {
            users: function() {
                return this.$store.state.users
            }
        }
    }
</script>

<style lang="scss" scoped>
.users {
    min-height: 5vh;
    width: 90%;
}
</style>