<template>
    <div id="getProfile">
        <div id="container-1">
            <img :src="image" alt="user image">
        </div>
        <div id="container-2">
            <h3>{{name}}</h3>
            <h4>{{ bio }}</h4>
            <h5>Birthdate: {{ birthdate }}</h5>
            <h5>Created at: {{ created_at }}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: "",
                followingNum: "",
                followerNum: "",
                profileStatus: "",
                Status: "",
                name: "",
                birthdate: "",
                created_at: "",
                bio: "",
                image: ""

            }
        },
        props: {
            userId: {
                type: Number,
                required: true
            }
        },
        methods: {
            getProfileCard: function() {
               for(let i=0; i<this.$store.state.users.length; i++) {
                    if(this.userId == this.$store.state.users[i].id) {
                        let user = this.$store.state.users[i];
                        this.name = user.username;
                        this.birthdate = user.birthdate;
                        this.created_at = user.created_at;
                        this.bio = user.bio;
                        this.image = user.image;
                        this.id = user.id;
                    }
                    else {
                        this.$store.dispatch("getAllUsers")
                    }
                }
            }
        }, 
        mounted () {
            this.getProfileCard();
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

#getProfile {
    min-height: 10vh;
    width: 40%;
    display: grid;
    grid-template-columns: 30% 70%;
    box-shadow: 1px 1px 1px grey;
    border-radius: 2em;
    background-color: white;
    justify-items: center;
    align-items: center;

    #container-1 {
        width: 100%;
        min-height: 5vh;
        display: grid;
        justify-items: center;
        align-items: center;

        img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
            display: grid;
            justify-items: left;
            align-items: center;
            margin-left: 1em;
            border: 2px solid white;
        }
    }
}

#container-2 {
    min-height: 5vh;
    width: 90%;
    display: grid;
    justify-items: left;
    align-items: center;

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        margin-bottom: 1em;
    }

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem; 
    }

    h5 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.7rem; 
        color: grey;
        margin: 0.3em 0 0.3em 0;
    }
}
</style>