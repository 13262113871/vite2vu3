import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("views/Home.vue");
const Login = () => import("components/user/login.vue");
const Users = () => import("components/page/twop/users.vue");
const Roles = () => import("components/page/twop/roles.vue");
const Rights = () => import("components/page/twop/rights.vue");
const Goods = () => import("components/page/twop/goods.vue");
const Params = () => import("components/page/twop/params.vue");
const Categories = () => import("components/page/twop/categories.vue");
const Orders = () => import("components/page/twop/orders.vue");
const Reports = () => import("components/page/twop/reports.vue");

const routes = [
  { path: "/", name: "Lgin", component: Login },
  { path: "/login", name: "Lgin", component: Login },
  {
    path: "/home",
    name: "Home",
    redirect:'/home/users',
    component: Home,
    children: [
      { path: "users", name: "Users", component: Users },
      { path: "roles", name: "Roles", component: Roles },
      { path: "rights", name: "Rights", component: Rights },
      { path: "goods", name: "Goods", component: Goods },
      { path: "params", name: "Params", component: Params },
      { path: "categories", name: "Categories", component: Categories },
      { path: "orders", name: "Orders", component: Orders },
      { path: "reports", name: "Reports", component: Reports },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 登录导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/login") return next(); // 直接点击登录页面
  if (!window.sessionStorage.getItem("token")) return next("/login"); // 没有token跳转到登录页面
  next();
});

export default router;
