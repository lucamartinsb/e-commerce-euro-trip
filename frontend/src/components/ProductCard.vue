<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../types/Product';
import { useCartStore } from '../stores/cartStore';

// Definição das Props (O que este componente recebe do pai?)
// Estamos dizendo: "Eu preciso receber um objeto 'product' obrigatoriamente"
const props = defineProps<{
  product: Product
}>();

const cartStore = useCartStore(); // Conectando ao Pinia para adicionar ao carrinho.

// Lógica Computada (Formatação de Preço)
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.product.price);
});

// Função para adicionar o produto ao carrinho:
const handleBuy = () => {
  cartStore.addToCart(props.product);
};
</script>

<template>
  <div class="product-card">
    <RouterLink :to="`/product/${product._id}`" class="card-image-link">
      <div class="card-image">
        <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="product-img"></img>
        <div class="no-image" v-else>{{ "Imagem indisponível" }}</div>
      </div>
    </RouterLink>

    <div class="card-details">
      <RouterLink :to="`/product/${product._id}`" class="product-link">
        <h3>{{ product.name }}</h3>
      </RouterLink>

      <p class="category">Categoria: {{ product.category }}</p>

      <div class="card-footer">
        <span class="price">{{ formattedPrice }}</span>

        <button @click="handleBuy" :disabled="!product.inStock" class="buy-btn">
          {{ product.inStock ? 'Comprar' : 'Esgotado' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  box-sizing: border-box;
  /* border: 0.1rem solid #e0e0e0; */
  box-shadow: #ffffff 0 0 5px;
  border-radius: 1.2rem;
  overflow: hidden;
  background-color: var(--color-background); /* Usa a cor do tema (Light/Dark) */
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  text-align: justify;
  padding: 0.8rem;
  gap: 1.6rem;
}

.product-card:hover {
  transform: translateY(-5px);
  /* box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1); */
  box-shadow: #ffffff 0 0 10px;
}

.card-image {
  border-radius: 0.8rem;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  overflow: hidden;
  box-shadow: #ffffff 0 0 5px;
}

.product-img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Ajusta a imagem para cobrir a área sem distorcer */
}

.no-image {
  padding: 7.1rem 8.1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #000000;
  background-color: #ccc;
  width: 100%;
  height: auto;
}

.product-link{
  text-transform: capitalize;
  text-decoration: none;
  color: inherit;
  height: 4.5rem
}

.card-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
}

.category {
  color: #cec1c1;
  text-transform: uppercase;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0.8rem 0; */
}

.price {
  color: #d8d405;
}

.buy-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.buy-btn:disabled {
  background-color: #f46c6c;
  cursor: not-allowed;
  box-shadow: none;
}

.buy-btn:hover:not(:disabled) {
  background-color: #1dce4c;
}
</style>