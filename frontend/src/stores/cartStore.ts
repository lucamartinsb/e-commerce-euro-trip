import { defineStore } from 'pinia';
import type { Product } from '../types/Product';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
    // Estado (State)
    const items = ref<Product[]>([]);

    // Ações (Actions)
    const addToCart = (product: Product) => {
        items.value.push(product);
    };

    const removeFromCart = (productId: string) => {
        const index = items.value.findIndex(item => item._id === productId);
        if (index > -1) {
            items.value.splice(index, 1);
        }
    };

    // Getters (Computed)
    const totalItems = computed(() => items.value.length);

    const totalPrice = computed(() => {
        return items.value.reduce((total, item) => total + item.price, 0);
    });

    return { items, addToCart, removeFromCart, totalItems, totalPrice };
});