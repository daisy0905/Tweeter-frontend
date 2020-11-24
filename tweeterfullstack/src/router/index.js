import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/Landing.vue"
import SignUpPage from "../views/Signup.vue"
import LoginPage from "../views/Login.vue"
import HomePage from "../views/Home.vue"

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
  
];

const router = new VueRouter({
  routes
});

export default router;
