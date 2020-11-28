<template>
    <div id="nested_comments">
        <div id="container-1">
            <h3>{{ nested_comment.username }}</h3>
            <h4>{{ nested_comment.created_at }}</h4>
        </div>
        <div id="container-2">
            <p>{{ nested_comment.content }}</p>
            <div id="unit" v-if="nested_comment.username == logUser">
                <img @click="goToComment" src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png" alt="update icon">
                <img @click="deleteNestedComment" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&usqp=CAU" alt="delete icon">
            </div>
        </div>
        <div id="container-3" v-if="display == true">
            <textarea id="nested_comment_input" name="comment-area" v-model="nested_content"></textarea>
            <button id="update-btn" @click="updateNestedComment">Update</button>
            <p>{{ status }}</p>
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'

    export default {
        name: "nested_comment",
        props: {
            nested_comment: {
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
            goToComment: function() {
                this.display =! this.display;
            },
            updateNestedComment: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/nested-comments",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: this.token,
                        id: this.nested_comment.id,
                        content: this.nested_content
                    }
                }).then((response) => {
                    console.log(response);
                    this.status = "Updated!";
                }).catch((error) => {
                    console.log(error);
                    this.status = "Failed to update!";
                })
            },
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
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#nested_comments {
    min-height: 10vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 
    background-color: white;
    z-index: 30;
    padding-bottom: 1em;
    box-shadow: 3px 3px 2px #AAB8C2;
    margin: 0.5em 0 0 0;
}

#container-1 {
    width: 90%;
    height: 5vh;
    grid-template-columns: 40% 60%;
    display: grid;
    justify-items: center;
    align-items: center; 
    border-bottom: 1px solid white;

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        color: #657786;
    }

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        color: #657786; 
    }
}

#container-2 {
    width: 100%;
    height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 80% 10% 10%; 
    margin: 0.5em 0.5em 0 0;
    
    p {
    width: 90%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    text-align: center;
    }

    #unit {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1fr;

        img {
            width: 20px;
        }
    }

}

#container-3 {
    width: 100%;
    min-height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 0.5em;

    #nested_comment_input {
        width: 90%;
        min-height: 10vh;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        background-color: white;
    }

    #update-btn {
        width: 30%;
        height: 4vh;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        color: white;
        border-radius: 0.3em;
        border: none;
        background-color: #1DA1F2;
        margin-top: 1em;
    }

    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        text-align: center;
        margin-top: 0.5em;
    }
}   
</style>