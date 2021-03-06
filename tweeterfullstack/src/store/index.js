import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import cookies from 'vue-cookies'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tweets: [],
    tweetList: [],
    id: cookies.get("UserId"),
    token: cookies.get("loginToken"),
    status: "",
    follows: [],
    userFollows: [],
    followers: [],
    userFollowers: [],
    users: [],
    user: [],
    retweets: []
  },
  mutations: {
    updateProfile: function(state, data) {
      state.user = data;
      console.log(state.user)
      state.status = "Success";
    },
    updateTweets: function(state, data) {
      state.tweets = data;
    },
    updateAllTweets: function(state, data) {
      state.tweetList = data;
    },
    updateFollow: function(state, data) {
      state.follows = data;
    },
    updateUserFollow: function(state, data) {
      state.userFollows = data;
    },
    updateFollower: function(state, data) {
      state.followers = data;
    },
    updateUserFollower: function(state, data) {
      state.userFollowers = data;
    },
    updateUser: function(state, data) {
      state.users = data;
    },
    updateAllRetweets: function(state, data) {
      state.retweets = data;
    },
  },
  actions: {
    getProfile: function(state) {
      console.log(cookies.get("userId"));
      axios.request({
        url: "https://daisyfulltweeter.ml/api/users",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        params: {
            id: cookies.get("userId"),
            loginToken: state.token
        }
    }).then((response) => {
        this.commit("updateProfile", response.data[0])
    }).catch((error) => {
        console.log(error);
        state.status = "Error";
    })
    },

    getTweets: function(context) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/tweets",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
            id: cookies.get("userId"),
        }
      }).then((response) => {
        context.commit("updateTweets", response.data),
        cookies.set("userTweetId", response.data.tweetId),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getAllTweets: function(context) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/tweets",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         }
      }).then((response) => {
        context.commit("updateAllTweets", response.data),
        cookies.set("userTweetId", response.data.id),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getAllUsers: function(state) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((response) => {
        this.commit("updateUser", response.data),
        console.log(response.data)
    }).catch((error) => {
        console.log(error);
        state.status = "Error";
    })
    },
    getUserFollowing: function(state) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/follows",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          user_id: cookies.get("userId"),
        }
      }).then((response) => {
        state.commit("updateUserFollow", response.data),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getFollowing: function(state) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/follows",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          user_id: cookies.get("otherId"),
        }
      }).then((response) => {
        state.commit("updateFollow", response.data),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getFollower: function(state) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/followers",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          follow_id: cookies.get("otherId"),
        }
      }).then((response) => {
        state.commit("updateFollower", response.data),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getUserFollower: function(state) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/followers",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          follow_id: cookies.get("userId"),
        }
      }).then((response) => {
        state.commit("updateUserFollower", response.data),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getAllRetweets: function(context) {
      axios.request({
        url: "https://daisyfulltweeter.ml/api/retweets",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         }
      }).then((response) => {
        context.commit("updateAllRetweets", response.data),
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    
  },
  modules: {}
});
