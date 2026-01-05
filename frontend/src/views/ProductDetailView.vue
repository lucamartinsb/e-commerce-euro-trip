<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from '../services/ApiService';
import type { Product } from '../types/Product';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

// Estado Reativo:
const product = ref<Product | null>(null);
const loading = ref(true);
const route = useRoute();
const cartStore = useCartStore();

onMounted(async () => {
    const productId = route.params.id as string;
    try {
        const response = await ApiService.getProductById(productId);
        product.value = response.data;
    } catch (error) {
        console.error('Não foi possível carregar os detalhes do produto: ' + error);
    } finally {
        loading.value = false;
    }
});

const handleBuy = () => {
    if (product.value) {
        cartStore.addToCart(product.value);
    }
};
</script>

<template>
    <div class="container">
        <div v-if="loading">Carregando...</div>
        <div v-else-if="product" class="product-detail">
            <div class="image-section">
                <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" />
                <div v-else class="placeholder">{{ product.name }}</div>
            </div>
            <div class="info-section">
                <h1>{{ product.name }}</h1>
                <p class="category">Categoria: {{ product.category }}</p>
                <h3 class="description">{{ product.description }}</h3>
                <p class="price">
                    {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price) }}
                </p>
                <button @click="handleBuy" :disabled="!product.inStock" class="buy-btn">
                    {{ product.inStock ? 'Adicionar ao Carrinho' : 'Esgotado' }}
                </button>
            </div>
        </div>
        <div v-else>Produto não encontrado.</div>
    </div>
</template>
<style scoped>
.container {
    max-width: 90vw;
    margin: 2rem auto;
}

.product-detail {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.image-section img {
    /* width: 70%; */
    border-radius: 8px;
}

.placeholder {
    width: 100%;
    height: 400px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    color: #ccc;
}

.info-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* width: 50%; */
    text-align: justify;
}

.category {
    text-transform: uppercase;
    color: #888;
}

.price {
    font-size: 2rem;
    font-weight: bold;
    color: #42b883;
}

.buy-btn {
    padding: 1rem;
    background: #42b883;
    color: white;
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
    border-radius: 8px;
    margin-top: 1rem;
}

.buy-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>