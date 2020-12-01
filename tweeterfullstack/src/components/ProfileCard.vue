<template>
    <div id="getProfile">
        <div id="container-1">
            <div id="user-image">
                <img :src="image" alt="user image">
                <h3>{{name}}</h3>
            </div>
            <div id="profile-btn">
                <!-- <follow></follow> -->
            </div>
        </div>
        <div id="container-2">
            <h4>{{ bio }}</h4>
            <h5>Birthdate: {{ birthdate }}</h5>
            <h5>Created at: {{ created_at }}</h5>
        </div>
        <div id="container-3">
            <div class="user-follow">
                <div></div>
                <h5>{{ followingNum }}</h5>
                <h4>Following</h4>
                <div></div>
            </div>
            <div class="user-follow">
                <div></div>
                <h5>{{ followerNum }}</h5>
                <h4>Follower</h4>
                <div></div>
            </div>
        </div>
        <div id="container-4">
            <h3>{{ status }}</h3>
        </div>
    </div>
</template>

<script>
// import Follow from './Follow.vue'
    export default {
        // components: { 
        //     Follow 
        // },
        data() {
            return {
                name: "",
                image: "",
                bio: "",
                birthdate: "",
                created_at: "",
                followingNum: "",
                followerNum: "",
                status: ""

            }
        },
        props: {
            userId: {
                type: Number,
                required: true
            }
        },
        methods: {
            viewProfile: function() {
                this.getProfile(),
                document.get
            },
            getProfileCard: function() {
                let ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        this.status = "Success!"
                        console.log(this.responseText);
                        let user = JSON.parse(this.responseText);
                        for(let i=0; i<this.user.length; i++) {
                            if(this.userId == this.user[i].id) {
                                this.name = user[0].username;
                                this.image = user[0].image;
                                this.bio = user[0].bio;
                                this.birthdate = user[0].birthdate;
                                this.created_at = user[0].created_at;
                            }
                        }
                    } else if(this.readyState !=4) {
                        this.status = "Loading!";
                    } else {
                        this.status = "Failed!";
                    }
                }
                ajax.open("GET", "http://127.0.0.1:5000/users", true);
                ajax.send()
            },
        },  
    }

</script>

<style lang="scss" scoped>

</style>