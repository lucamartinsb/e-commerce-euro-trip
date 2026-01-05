import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductCreateView from '../views/ProductCreateView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CartView from '../views/CartView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/create',
            name: 'create-product',
            component: ProductCreateView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/product/:id', // :id é um parâmetro dinâmico
            name: 'product-detail',
            component: ProductDetailView
        }
    ]
});

export default router;