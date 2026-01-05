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
                <div v-else class="no-image">{{ "Imagem Indisponível" }}</div>
            </div>
            <div class="info-section">
                <h1 class="name">{{ product.name }}</h1>
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
    max-width: 70vw;
    margin: 2rem auto;
}

.product-detail {
    display: flex;
    flex-direction: row;
    padding: 1.6rem;
    flex-wrap: wrap;
    gap: 1.6rem;
    border: #42b883 1px solid;
}

.image-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-section img {
    max-width: 40vw;
    height: auto;
    border-radius: 8px;
}

.info-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: justify;
}

.no-image {
    width: 40vw;
    height: 25vw;
    background: #eee;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bolder;
    color: #ccc;
    border-radius: 8px;
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
}

.buy-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>