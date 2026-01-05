<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';

// Conectando ao Pinia para ler quantos itens tem
const cartStore = useCartStore();
</script>

<template>
    <header class="header">
        <div class="container">
            <RouterLink to="/" class="logo">
                EuroTrip ✈️
            </RouterLink>

            <nav>
                <RouterLink to="/" class="nav-link">Loja</RouterLink>
                <RouterLink to="/create" class="nav-link">Novo Produto</RouterLink>

                <RouterLink to="/cart" class="nav-link cart-link">
                    Carrinho 🛒
                    <span v-if="cartStore.totalItems > 0" class="badge">
                        {{ cartStore.totalItems }}
                    </span>
                </RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: #242424;
    border: 1px solid #333 ;
    border-radius: 0.4rem;
    padding: 1.2rem 0;
    margin: 0.2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 0 5px rgba(66, 184, 131, 0.2);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    font-size: 1.8rem;
}

nav {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: #ccc;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    font-size: 1.4rem;
}

.nav-link:hover,
.router-link-active {
    color: #42b883;
}

.cart-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.badge {
    background-color: #42b883;
    color: #242424;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.1rem 0.4rem;
    border-radius: 10px;
}
</style>