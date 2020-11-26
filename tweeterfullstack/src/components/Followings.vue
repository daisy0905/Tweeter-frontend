<template>
    <div>
        <following class="followings" v-for="follow in follows" :key="follow.follow_id" :follow="follow">

        </following>
    </div>
</template>

<script>
import Following from './Following'

    export default {
        name: "followings",
        components: {
            Following
        },
        computed: {
            follows: function() {
                return this.$store.state.follows
            }
        }
    }
</script>

<style lang="scss" scoped>
.followings {
    min-height: 15vh;
    width: 90%;
}
</style>