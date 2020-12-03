import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/Landing.vue"
import SignUpPage from "../views/Signup.vue"
import LoginPage from "../views/Login.vue"
import HomePage from "../views/Home.vue"
import ProfilePage from "../views/Profile.vue"
import CommentPage from "../views/Comment.vue"
import TweetPage from "../views/UploadTweet.vue"
import EditProfilePage from "../views/EditProfile.vue"
import FollowPage from "../views/Follow.vue"
import UserIntroPage from "../views/UserIntro.vue"
import UserFollowPage from "../views/UserFollow.vue"
import TweetsPage from "../views/Tweets.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "lading-page",
    component: LandingPage
  },
  {
    path: "/signup",
    name: "signup-page",
    component: SignUpPage
  },
  {
    path: "/login",
    name: "login-page",
    component: LoginPage
  },
  {
    path: "/home",
    name: "home-page",
    component: HomePage
  },
  {
    path: "/profile",
    name: "profile-page",
    component: ProfilePage
  },
  {
    path: "/comment",
    name: "comment-page",
    component: CommentPage
  },
  {
    path: "/tweet",
    name: "tweet-page",
    component: TweetPage
  },
  {
    path: "/editprofile",
    name: "edit-profile-page",
    component: EditProfilePage
  },
  {
    path: "/follow",
    name: "follow-page",
    component: FollowPage
  },
  {
    path: "/userintro",
    name: "userintro-page",
    component: UserIntroPage
  },
  {
    path: "/userfollow",
    name: "userfollow-page",
    component: UserFollowPage
  },
  {
    path: "/tweets",
    name: "tweets-page",
    component: TweetsPage
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
