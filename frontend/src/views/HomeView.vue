<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// O @ geralmente é um atalho para a pasta 'src' configurado no Vite
import { products } from '@/data/products.js'

const selectedProduct = ref(null)
const isLightTheme = ref(false)

const presentear = (product) => selectedProduct.value = product
const toggleTheme = () => isLightTheme.value = !isLightTheme.value

const confirmarPresente = () => {
  if (selectedProduct.value) {

    router.push({
      name: 'checkout', // Nome da sua rota de destino (Ex: Checkout, Confirmacao)
      params: { productId: selectedProduct.value.id  } // Passa o ID do produto e os dados como string JSON
    })


  }
}
</script>



<template>
  <main :class="['app-wrapper', isLightTheme ? 'light' : 'dark']">

    <!-- Botão de Tema -->
    <button class="theme-btn" @click="toggleTheme" :title="isLightTheme ? 'Ir para modo escuro' : 'Ir para modo claro'">
       {{ isLightTheme ? '🌙' : '☀️' }}
    </button>

    <div class="container">
      <header class="hero">
        <h1>Chá de casa nova</h1>
        <p>Presentes para novos começos e momentos especiais.
          Com carinho André e Camilly.
        </p>
      </header>

      <!-- Grid Responsivo -->
      <section class="products-grid">
        <article v-for="product in products" :key="product.id" class="card">
          <div class="card-image-wrapper">
             <img :src="product.image" :alt="product.name" loading="lazy" />
          </div>
          <div class="card-content">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="card-footer">
              <span class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</span>
              <button class="btn-action" @click="presentear(product)">Presentear</button>
            </div>
          </div>
        </article>
      </section>
    </div>

    <!-- Barra de Seleção Fixa (Mobile Friendly) -->
    <transition name="slide-up">
      <div v-if="selectedProduct" class="selection-bar">
        <div class="selection-content">
          <span>Selecionado: <strong>{{ selectedProduct.name }}</strong></span>
          <small>Para presentear este item clique em confirmar.</small>
        </div>
        <button class="btn-action btn-confirm" @click="confirmarPresente" >Confirmar</button>
      </div>
    </transition>

  </main>
</template>

<style scoped>


.hero {
  text-align: center;
  margin-bottom: 3rem;
}
.hero h1 { font-size: 2rem; margin-bottom: 0.5rem; }
.hero p { opacity: 0.8; }

/* Grid Mágica: Adapta de Celular até TV */
.products-grid {
  display: grid;
  /* Cria colunas de no MÍNIMO 260px. Se sobrar espaço, cria mais colunas. */
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

/* --- CARDS --- */
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.card-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover img { transform: scale(1.05); }

.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1; /* Ocupa altura restante para alinhar botões */
  gap: 0.5rem;
}

.card-footer {
  margin-top: auto; /* Empurra o footer para baixo */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}

.price {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary);
}



.theme-btn {
  position: absolute;
  top: 1rem; right: 1rem;
  background: transparent;
  border: 1px solid var(--card-border);
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
}

/* --- BARRA DE SELEÇÃO FIXA --- */
.selection-bar {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: var(--card-bg);
  border: 1px solid var(--primary);
  padding: 1rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.selection-content {
  display: flex;
  flex-direction: column;
}

/* Animação de entrada da barra */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translate(-50%, 100px); opacity: 0; }
</style>
