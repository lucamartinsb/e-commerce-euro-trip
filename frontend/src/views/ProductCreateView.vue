<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '../services/ApiService';

const router = useRouter();

// Estado do formulário
const name = ref('');
const price = ref(0);
const category = ref('');
const description = ref('');
const inStock = ref(true);
const selectedFile = ref<File | undefined>(undefined);

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
    }
};

const submitForm = async () => {
    try {
        // Criar FormData para enviar arquivo + textos
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('price', price.value.toString());
        formData.append('category', category.value);
        formData.append('description', description.value);
        formData.append('inStock', inStock.value.toString());

        if (selectedFile.value) {
            formData.append('image', selectedFile.value); // 'image' deve bater com o backend (upload.single('image'))
        }

        await ApiService.createProduct(formData);
        alert('Produto criado com sucesso!');
        router.push('/'); // Voltar para a Home
    } catch (error) {
        console.error(error);
        alert('Erro ao criar produto.');
    }
};
</script>

<template>
    <div class="create-container">
        <h1>Novo Produto</h1>
        <form @submit.prevent="submitForm" class="product-form">
            <div class="form-group">
                <label>Nome do Produto</label>
                <input v-model="name" type="text" required />
            </div>

            <div class="form-group">
                <label>Preço (R$)</label>
                <input v-model.number="price" type="number" step="0.01" required />
            </div>

            <div class="form-group">
                <label>Categoria</label>
                <input v-model="category" type="text" required />
            </div>

            <div class="form-group">
                <label>Descrição</label>
                <textarea v-model="description"></textarea>
            </div>

            <div class="form-group">
                <label>Imagem</label>
                <input type="file" @change="handleFileUpload" accept="image/*" />
            </div>

            <div class="form-group checkbox">
                <label>
                    <input v-model="inStock" type="checkbox" />
                    Em Estoque
                </label>
            </div>

            <button type="submit" class="submit-btn">Salvar Produto</button>
        </form>
    </div>
</template>

<style scoped>
.create-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

input,
textarea {
    padding: 0.8rem;
    background: #333;
    border: 1px solid #444;
    color: white;
    border-radius: 4px;
}

.checkbox {
    flex-direction: row;
    align-items: center;
}

.submit-btn {
    background: #42b883;
    color: white;
    padding: 1rem;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 0.4rem;
}
</style>