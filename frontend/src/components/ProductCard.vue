<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../types/Product';

// Definição das Props (O que este componente recebe do pai?)
// Estamos dizendo: "Eu preciso receber um objeto 'product' obrigatoriamente"
const props = defineProps<{
  product: Product
}>();

// Lógica Computada (Formatação de Preço)
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.product.price);
});
</script>

<template>
  <div class="product-card">
    <div class="card-image">
      <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="product-img"></img>
      <span v-else>{{ product.name }}</span>
    </div>

    <div class="card-details">
      <h2>{{ product.name }}</h2>
      <h3 class="category">Categoria: {{ product.category }}</h3>
      <p class="description">{{ product.description }}</p>

      <div class="card-footer">
        <span class="price">{{ formattedPrice }}</span>

        <button :disabled="!product.inStock" class="buy-btn">
          {{ product.inStock ? 'Comprar' : 'Esgotado' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  box-sizing: border-box;
  border: 0.1rem solid #e0e0e0;
  border-radius: 0.8rem;
  overflow: hidden;
  background-color: var(--color-background); /* Usa a cor do tema (Light/Dark) */
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  padding: 0.8rem;
  gap: 1.6rem;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
}

.card-image {
  border-radius: 0.8rem;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Ajusta a imagem para cobrir a área sem distorcer */
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.category {
  color: #888;
  text-transform: capitalize;
}

.card-footer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.8rem 0;
}

.price {
  color: #249a65;
}

.buy-btn {
  background-color: #42b883; 
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold
}

.buy-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.buy-btn:hover:not(:disabled) {
  background-color: #1dce4c;
}
</style>