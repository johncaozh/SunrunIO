import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: "/products"
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/logout',
      name: 'logout',
      component: resolve => require(['../components/logout.vue'], resolve)
    }, {
      path: '/products',
      component: resolve => require(['../components/normal/products.vue'], resolve)
    },
    {
      path: '/layout',
      component: resolve => require(['../components/normal/layout.vue'], resolve),
      children: [{
          path: '/products/:id/packages',
          component: resolve => require(['../components/normal/packages.vue'], resolve)
        }, {
          path: '/products/:id/faqs',
          component: resolve => require(['../components/normal/faqs.vue'], resolve)
        },
        {
          path: '/products/:id/docs',
          component: resolve => require(['../components/normal/docs.vue'], resolve)
        },
      ]
    },
    {
      path: "/singleTemplate",
      component: resolve => require(['../components/normal/singleTemplate.vue'], resolve),
      children: [{
        path: "/packages/:id",
        component: resolve => require(['../components/normal/singlePackage.vue'], resolve),
      }, {
        path: "/docs/:id",
        component: resolve => require(['../components/normal/singleDoc.vue'], resolve),
      }, {
        path: "/faqs/:id",
        component: resolve => require(['../components/normal/singleFaq.vue'], resolve),
      }, {
        path: "/versions/:id",
        component: resolve => require(['../components/normal/singleVersion.vue'], resolve),
      }, {
        path: "/platforms/:id",
        component: resolve => require(['../components/normal/singlePlatform.vue'], resolve),
      }, {
        path: "/users/:id",
        component: resolve => require(['../components/normal/singleUser.vue'], resolve),
      }]
    }, {
      path: '/manager/products',
      component: resolve => require(['../components/manage/products.vue'], resolve),
    }, {
      path: '/manager/links',
      component: resolve => require(['../components/manage/links.vue'], resolve),
    }, {
      path: '/manager/layout',
      component: resolve => require(['../components/manage/layout.vue'], resolve),
      children: [{
          path: '/manager/versions',
          component: resolve => require(['../components/manage/versions.vue'], resolve),
        }, {
          path: '/manager/faqs',
          component: resolve => require(['../components/manage/faqs.vue'], resolve),
        },
        {
          path: '/manager/docs',
          component: resolve => require(['../components/manage/docs.vue'], resolve),
        },
        {
          path: '/manager/platforms',
          component: resolve => require(['../components/manage/platforms.vue'], resolve),
        },
        {
          path: '/manager/packages',
          component: resolve => require(['../components/manage/packages.vue'], resolve),
        },
        {
          path: '/manager/users',
          component: resolve => require(['../components/manage/users.vue'], resolve),
        },
      ]
    },
  ],

  mode: "history"
})
