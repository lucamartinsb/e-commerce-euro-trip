<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();
const formattedTotal = (val: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(val);
</script>

<template>
    <div class="cart-container">
        <h1>Seu Carrinho:</h1>
        <div v-if="cartStore.items.length === 0" class="empty-cart">
            <p>Seu carrinho está vazio.</p>
            <RouterLink to="/" class="back-link">Voltar para a loja</RouterLink>
        </div>
        <div v-else class="cart-content">
            <ul class="cart-list">
                <li v-for="(item, index) in cartStore.items" :key="index" class="cart-item">
                    <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="item-image" />
                    <div class="item-info">
                        <div class="item-title">
                            <h3>{{ item.name }}</h3>
                        </div>
                        <div class="item-price">
                            <p>{{ formattedTotal(item.price) }}</p>
                        </div>
                    </div>
                    <button @click="cartStore.removeFromCart(item._id)" class="remove-btn">Remover</button>
                </li>
            </ul>
            <div class="cart-summary">
                <h2>Total: {{ formattedTotal(cartStore.totalPrice) }}</h2>
                <button class="checkout-btn">Finalizar Compra</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-container {
    max-width: 80%;
    margin: 1.6rem auto;
}

.empty-cart {
    text-align: center;
    margin-top: 3rem;
}

.cart-list {
    list-style: none;
    margin: 1.6rem auto;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem;
    margin: 1.6rem 0;
    border: 0.2rem solid #333;
    border-radius: 0.8rem;
}

.item-info {
    display: flex;
    align-items: center;
    width: 90%;
}

.item-image {
    width: 10%;
    object-fit: cover;
    border-radius: 0.4rem;
}

.item-title {
    width: 80%;
    margin: auto;
}

.item-price {
    font-size: 1.4rem;
    font-weight: bold;
    color: #42b883;
    margin: auto;
}

.remove-btn {
    color: #e7e2e2;
    background: #e53935;
    border: none;
    cursor: pointer;
    text-decoration: none;
    padding: 0.6rem 1rem;
    border-radius: 0.4rem;
    font-weight: bold;
    font-size: 1rem;
}

.cart-summary {
    display: flex;
    justify-content: space-between;
    text-align: right;
    margin-top: 2rem;
    border-top: 2px solid #444;
    padding-top: 1rem;
}

.checkout-btn {
    background: #42b883;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 1rem;
}

.back-link {
    color: #42b883;
    text-decoration: none;
}
</style>