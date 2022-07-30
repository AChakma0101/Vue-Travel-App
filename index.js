import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

import sourceData from '@/data.json'

//import About from '@/views/About.vue'

//import Brazil from '@/views/Brazil.vue'

//import Hawaii from '@/views/Hawaii.vue'

//import Jamaica from '@/views/Jamaica.vue'

//import Panama from '@/views/Panama.vue'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {
        path: '/protected',
        name: 'protected',
        component: ()=> import('@/views/Protected.vue'),
        meta:{
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('@/views/Login.vue')
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: ()=> import('@/views/Invoices.vue'),
        meta: {requiresAuth: true},
    },

    //{path: '/about', name: 'About', component: About},

    //{path: '/brazil', name: 'brazil', component: ()=>import('@/views/Brazil.vue')},

    //{path: '/hawaii', name: 'hawaii', component: ()=>import('@/views/Hawaii.vue')},
    
    //{path: '/jamaica', name: 'Jamaica', component: ()=>import('@/views/Jamaica.vue')},

    //{path: '/panama', name: 'panama', component: ()=>import('@/views/Panama.vue')},

    {
        path: '/destination/:id/:slug', 
        name: 'destination.show', 
        component: ()=>import('@/views/DestinationShow.vue'),
        //props: true,
        //props: {
        //    newsletterPopup: false,
        //},
        //props: {
        //    newsletterPopup: false,
        //},
        //props: route=> ({ newsletterPopup: someExpression ? true: false }),
        props: route=> ({...route.params, id: parseInt(route.params.id)}),
        //per-route navigation guard
        beforeEnter(to, from){
            const exists = sourceData.destinations.find(
                destination => destination.id === parseInt(to.params.id)
            )
            if(!exists) return {
                name: 'NotFound',
                //allows keeping the URL while rendering a different page
                params: {pathMatch: to.path.split('/').slice(1)},
                query: to.query,
                hash: to.hash,
            }
        },
        children: [
            {
                path: ':experienceSlug',
                name: 'experience.show',
                component: () => import('@/views/ExperienceShow.vue'),
                props: route=> ({...route.params, id: parseInt(route.params.id)})
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ()=> import('@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        //ScrollToOptions object returned that can contain any of the following properties
        //return {top: null, left: null, behavior: null}
        //for this use case
        //return savedPosition || {top: 0}
        //to fix conflict between transition and scroll behavior by returning a promise using a setTimeut
        return savedPosition || new Promise((resolve)=>{
            //setTimeout(()=> resolve({ top:0 }), 300)
            //smooth scroll behavior
            setTimeout(()=> resolve({ top:0, behavior: 'smooth' }), 300)
        })
    }
})

router.beforeEach((to, from)=>{
    if(to.meta.requiresAuth && !window.user){
        return {name: 'login', query:{ redirect: to.fullPath}}
    }
})

export default router