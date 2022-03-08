import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { bus } from '../main';
import store from '@/store/index';
//import Home from '../views/Home.vue'

Vue.use(VueRouter);

const Auth = (next: any, to: any) => {
	if (localStorage.getItem('SET_TOKEN') !== null && localStorage.getItem('SET_TOKEN') !== undefined && to.path !== '/') {
		bus.$emit('connected', true);
		next();
	} else {
		localStorage.clear();
		bus.$emit('connected', false);
		next({ name: 'Connexion' });
	}
};

/**@param {boolean} isActive */
const setRequiresAuth = (isActive: boolean) => {
	return {
		requiresAuth: isActive
		//transition: 'fade-in-up'
	};
};

const routes: Array<RouteConfig> = [
	{
		path: '/',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/views/Index.vue'),
		children: [
			{
				name: 'Connexion',
				path: '/login',
				component: () => import('@/views/pages/Login.vue'),
				meta: setRequiresAuth(false)
			},
			{
				name: 'Accueil',
				path: '/',
				component: () => import('@/views/pages/Dashboard.vue'),
				//beforeEnter: (to, from, next) => Auth(next, to)
				meta: setRequiresAuth(true)
			},
			{
				name: 'Administrateurs',
				path: '/administrateurs',
				component: () => import('@/views/pages/Administrateurs.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Administrateur',
				path: '/administrateurs/administrateur',
				component: () => import('@/views/pages/InfosAdministrateur.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Calendrier',
				path: '/calendar',
				component: () => import('@/views/pages/Calendar.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Clients',
				path: '/clients',
				component: () => import('@/views/pages/Clients.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Client',
				path: '/clients/client',
				component: () => import('@/views/pages/InfosClient.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Paramètres',
				path: '/parametres',
				component: () => import('@/views/pages/Parametres.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Support',
				path: '/support',
				component: () => import('@/views/pages/Support.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Maps',
				path: '/maps',
				component: () => import('@/views/pages/Maps.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Map',
				path: '/maps/map',
				component: () => import('@/views/pages/InfosMap.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Events',
				path: '/events',
				component: () => import('@/views/pages/Events.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Event',
				path: '/events/event',
				component: () => import('@/views/pages/InfosEvent.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Equipments',
				path: '/equipments',
				component: () => import('@/views/pages/Equipments.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Equipment',
				path: '/equipments/equipment',
				component: () => import('@/views/pages/InfosEquipment.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Objects',
				path: '/objects',
				component: () => import('@/views/pages/Objects.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Object',
				path: '/objects/object',
				component: () => import('@/views/pages/InfosObject.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Monsters',
				path: '/monsters',
				component: () => import('@/views/pages/Monsters.vue'),
				meta: setRequiresAuth(true)
			},
			{
				name: 'Informations-Monster',
				path: '/monsters/monstre',
				component: () => import('@/views/pages/InfosMonster.vue'),
				meta: setRequiresAuth(true)
			}
		]
	},
	{
		path: '*',
		component: () => import('@/views/Index.vue'),
		children: [
			{
				name: '404 Error',
				path: '/',
				redirect: '/',
				component: () => import('@/views/Error.vue')
			}
		]
	}
];

const isElectron: boolean = true; //String(process.env.IS_WEB).trim()
const router = new VueRouter({
	mode: isElectron ? 'hash' : 'history', // hash mode for electron
	base: process.env.BASE_URL,
	routes
});

router.beforeEach(async (to: any, from: any, next: any) => {
	if (to.matched.some((record: { meta: { requiresAuth: any; }; }) => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		const token = localStorage.getItem('SET_TOKEN');
		if (token === null || token === undefined) {
			//localStorage.clear();
			bus.$emit('connected', false);
			await store.dispatch('clearToken');
			next({
				//path: '/login',
				//query: { redirect: to.path }
				name: 'Connexion'
			});
		} else {
			bus.$emit('connected', true);
			next();
		}
	} else {
		bus.$emit('connected', false);
		next(); // make sure to always call next()!
	}
});

export default router;
