import store from '@/state/store'

export default [
  {
    path: '/',
    name: 'Accueil',
    meta: {
      authRequired: false,
    },
    component: () => import('./views/homepage'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/account/register'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('./views/account/forgot-password'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch('auth/logOut')
        } else {
          store.dispatch('authfack/logout')
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'default' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/offers-partners',
    name: 'Boutique des offres partenaires',
    meta: {
    },
    component: () => import('./views/shops/offers-partners')
  },
  {
    path: '/lcshop',
    name: 'Boutique LC',
    meta: {
    },
    component: () => import('./views/shops/lcshop')
  },
  {
    path: '/product-detail',
    name: 'Detail du produit',
    meta: {
    },
    component: () => import('./views/shops/product-detail')
  },
  {
    path: '/service-detail',
    name: 'Detail du service',
    meta: {
    },
    component: () => import('./views/shops/service-detail')
  },
  {
    path: '/mylcard',
    name: 'Ma carte LC',
    meta: {
    },
    component: () => import('./views/LCards/mylcard')
  },
  {
    path: '/cart',
    name: 'Panier',
    meta: {
    },
    component: () => import('./views/shops/cart')
  },
  {
    path: '/checkout',
    name: 'Payement',
    meta: {
    },
    component: () => import('./views/shops/checkout')
  },
  {
    path: '/example',
    name: 'example',
    meta: {
    },
    component: () => import('./views/example/example')
  },
  {
    path: '/500',
    name: 'InternetServerError',
    meta : {
      title: 'Internet Server Error',
    },
    component: () => import('./views/errors/500')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    meta : {
      title: '404 Notfound',
    },
    component: () => import('./views/errors/404')
  }

]
