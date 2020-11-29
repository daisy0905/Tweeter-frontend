<template>
    <div>
        <div id="container-1">
            <h3>{{ retweet.username }}</h3>
            <h4>{{ retweet.created_at }}</h4>
        </div>
        <div id="container-2">
            <p>{{ retweet.content }}</p>
            <div id="unit" v-if="retweet.username == logUser">
                <img @click="deleteNestedComment" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&usqp=CAU" alt="delete icon">
            </div>
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        name: "retweet",
        props: {
            retweet: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                token: cookies.get("loginToken"),
                display: false,
                status: "",
                nested_content: ""
            }
        },
        methods: {
            deleteNestedComment: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/nested-comments",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: cookies.get("loginToken"),
                        id: this.nested_comment.id
                    }
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                }) 
            },
        },
        computed: {
            logUser() {
                return cookies.get('userName') 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>