<template>
    <div class="comments">
        <div class="container-1">
            <h3>{{ comment.username }}</h3>
            <h4>{{ comment.created_at }}</h4>
        </div>
        <div class="container-2">
            <p>{{ comment.content }}</p>
        </div>
        <div class="container-3">
            <div></div>
            <div class="unit-1">
                <h5 @click="viewNestedComments">{{ nested_commentNum }}</h5>
                <img @click="goToNestedComments" src="https://www.kindpng.com/picc/m/153-1537658_twitter-comment-icon-png-clipart-png-download-topic.png" alt=" nested comment icon">
            </div>
            <div class="unit-2">
                <span class="like-active">{{ commentLikeNum }}</span>
                <img src="../assets/like-icon.png" alt="tweeter like icon" v-if="ifLike" @click="deleteLike">
                <img src="../assets/unlike-icon.png" alt="tweeter unlike icon" v-else @click="createLike">
            </div>
            <div class="unit-3">
                <img v-if="comment.username == logUser" class="comment-btn" @click="goToComment" src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png" alt="update icon">
                <img v-if="comment.username == logUser" class="comment-btn" @click="deleteComment" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&usqp=CAU" alt="delete icon">
            </div>
            <div></div>
        </div>
        <div class="container-4" v-if="display == true">
            <nested-comment class="nested_comments" v-for="nested_comment in nested_comments" :key="nested_comment.id" :nested_comment="nested_comment"></nested-comment>
        </div>
        <div class="container-5" v-if="show == true">
            <textarea class="nested_comment_input" name="comment-area" v-model="nested_content"></textarea>
            <button @click="createNestedComment">Create</button>
            <p>{{ status }}</p>
        </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'
import NestedComment from './NestedComment.vue'

    export default {
        name: "comment",
        components: {
            NestedComment,
        },
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                token: cookies.get("loginToken"),
                ifLike: false,
                commentLikeNum: "",
                display: false,
                show: false,
                nested_commentNum: "",
                nested_comments: [],
                nested_comment: {},
                nested_content: "",
                status: ""
            }
        },
        methods: {
            viewNestedComments: function() {
                this.display =! this.display;
            },
            goToNestedComments: function() {
                this.show =! this.show;
            },
            goToComment: function() {
                cookies.set("userCommentId", this.comment.id);
                cookies.set("userContent", this.comment.content)
                this.$router.push("Comment")
            },
            deleteComment: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/comments",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: cookies.get("loginToken"),
                        id: this.comment.id
                    }
                }).then((response) => {
                    console.log(response);
                    location.reload();
                }).catch((error) => {
                    console.log(error);
                }) 
            },
            getCommentLike: function() {
                axios.request({
                url: "http://127.0.0.1:5000/comment-likes",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    comment_id: this.comment.id
                }
                }).then((response) => {
                    console.log(response.data);
                    this.commentLikeNum = response.data.length;
                    for(let i=0; i<response.data.length; i++) {
                    if(response.data[i].username == cookies.get("userName")) {
                    this.ifLike = true;
                    return
                    }
                    this.ifLike = false;
                }
                }).catch((error) => {
                    console.log(error)
                })
            },
            createLike: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/comment-likes",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        token: this.token,
                        comment_id: this.comment.id
                    }
                }).then((response) => {
                   console.log(response.data);
                   this.ifLike = true;
                   this.getCommentLike();
               }).catch((error) => {
                   console.log(error)
               })
            },
            deleteLike: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/comment-likes",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                       token: this.token,
                       comment_id: this.comment.id
                   }
                }).then((response) => {
                    console.log(response);
                    this.ifLike = false;
                    this.getCommentLike();
                }).catch((error) => {
                    console.log(error)
                })
            },
            getNestedComments: function() {
                axios.request({
                url: "http://127.0.0.1:5000/nested-comments",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    comment_id: this.comment.id
                }
                }).then((response) => {
                    console.log(response.data);
                    this.nested_commentNum = response.data.length;
                    this.nested_comments = response.data;
                    console.log(this.nested_comments);
                }).catch((error) => {
                    console.log(error)
                })
            },
            createNestedComment: function() {
                axios.request({
                   url: "http://127.0.0.1:5000/nested-comments",
                   method: "POST",
                   headers: {
                    "Content-Type": "application/json",
                   },
                   data: {
                       token: this.token,
                       content: this.nested_content,
                       comment_id: this.comment.id
                   }
               }).then((response) => {
                   console.log(response);
                   this.status = "Commented!";
                   this.nested_comment = response.data;
                   console.log(this.nested_comment);
               }).catch((error) => {
                   console.log(error);
                   this.status = "Failed to comment!";
               })
            }
        }, 
        mounted () {
            this.getCommentLike();
            this.getNestedComments()
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

.comments {
    min-height: 5vh;
    width: 90%;
    display: grid;
    justify-items: center;
    align-items: center; 
    background-color:  #E1E8ED;
    border: 1px solid #1DA1F2;
    border-radius: 1em;
    padding-bottom: 1em;
    margin: 0.5em 0 0 0;
}

.container-1 {
    width: 100%;
    height: 5vh;
    grid-template-columns: 30% 50% 20%;
    display: grid;
    justify-items: center;
    align-items: center; 
    border-bottom: 1px solid #657786;
    margin-top: 0.5em;

    h3 {
        font-weight: bold; 
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
    }

    h4 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem; 
        color: #657786;
    }
}

.container-2 {
    width: 100%;
    min-height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 0.5em;
    

    p {
    width: 90%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    }
}

.container-3 {
    width: 90%;
    height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 1em;
    background-color: white;
    border-radius: 0.5em;
    grid-template-columns: 5% repeat(4, 1fr) 5%;
    

    .unit-1 {
        height: 100%;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr;

        img {
            width: 20px;
        }

        h5 {
            font-weight: bold; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
        }
    }
    
    .unit-2 {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 1fr 1.5fr;

        .like-active {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            color: #AAB8C2;
            font-weight: bold;
        }
        
        img {
            width: 20px;
        }
    }

    .unit-3 {
    width: 100%;
    height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr; 

        img {
            width: 20px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            border: none;
            border-bottom: 1px solid #657786;
            background-color: white;
        }
    }   
}

.container-4 {
    width: 100%;
    min-height: 30vh;
    display: grid;
    justify-items: center;
    align-items: center; 
}

.container-5 {
    width: 100%;
    min-height: 5vh;
    display: grid;
    justify-items: center;
    align-items: center; 
    margin-top: 0.5em;

    .nested_comment_input {
        width: 90%;
        min-height: 10vh;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
        background-color: white;
    }

    button {
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