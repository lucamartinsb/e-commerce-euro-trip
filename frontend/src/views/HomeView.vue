<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from '../services/ApiService';
import type { Product } from '../types/Product';
import ProductCard from '../components/ProductCard.vue';

// Estado Reativo:
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Ciclo de Vida (Ao Montar):
onMounted(async () => {
    try {
        // Faz a chamada ao Backend (porta 30000):
        const response = await ApiService.GetProducts();
        products.value = response.data;
    } catch (err) {
        console.error(err);
        error.value = 'Não foi possível carregar os produtos. Verifique se o backend está rodando.';
    } finally {
        loading.value = false;
    }
});

</script>

<template>
    <div class="home">
        <div v-if="loading" class="loading">
            Carregando produtos...
        </div>

        <div v-else-if="error" class="error">
            {{ error }}
        </div>

        <div v-else class="product-grid">
            <ProductCard v-for="product in products" :key="product._id" :product="product" />
        </div>
    </div>
</template>

<style scoped>
.home {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.loading,
.error {
    text-align: center;
    font-size: 1.2rem;
    margin-top: 3rem;
}

.error {
    color: #e53935;
}

/* Grid Responsivo: Cria colunas automaticamente baseadas no tamanho: */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
}
</style>