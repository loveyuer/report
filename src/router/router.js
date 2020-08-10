import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    name: "index",
    component: () => import("../pages/index.vue"),
    path: "/",
    redirect: '/orderForm/overview',
    meta: {
      title: "定单-数据概览",
    },
    children: [
      {
        name: "overview",
        component: () => import("../pages/orderForm/index.vue"),
        path: "/orderForm/overview",
        meta: {
          title: "定单-数据概览",
        },
      },
      {
        name: "shutdown",
        component: () => import("../pages/shutdown/index.vue"),
        path: "/shutdown",
        meta: {
          title: "停机",
        },
      },
    ],
  },
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
