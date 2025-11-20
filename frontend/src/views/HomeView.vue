<script setup>
import { ref } from 'vue'

const products = [
  {
    id: 1,
    name: 'Cesta Chá de Panela',
    description: 'Itens básicos de cozinha com um toque carinhoso.',
    price: 129.9,
    image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&w=900'
  },
  {
    id: 2,
    name: 'Kit Café na Cama',
    description: 'Bandeja, canecas, guardanapos e café especial.',
    price: 89.9,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&w=900'
  },
  {
    id: 3,
    name: 'Jantar a Dois',
    description: 'Conjunto de pratos, taças e velas românticas.',
    price: 189.9,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&w=900'
  },
  {
    id: 4,
    name: 'Cantinho do Chá',
    description: 'Bule, xícaras e lata de chá para o novo lar.',
    price: 99.9,
    image: 'https://images.unsplash.com/photo-1518976024611-28bf4b48222e?auto=format&w=900'
  }
]

const selectedProduct = ref(null)
const isLightTheme = ref(false) // dark por padrão

const presentear = (product) => {
  selectedProduct.value = product
}

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
}
</script>

<template>
  <main :class="['container', isLightTheme ? 'theme-light' : 'theme-dark']">
    <!-- Toggle de tema com "lampadinha" -->
    <button class="theme-toggle" type="button" @click="toggleTheme">
      <span class="icon">💡</span>
      <span class="label">
        {{ isLightTheme ? 'Modo noite' : 'Modo Camilly' }}
      </span>
    </button>

    <header class="hero">
      <h1>My Home Simple Shop</h1>
      <p class="subtitle">
        Presentes para chá de panela e novos começos — simples, rápidos e com carinho.
      </p>
    </header>

    <section class="products-section">
      <h2 class="section-title">Escolha um presente</h2>

      <div class="products-grid">
        <article
          v-for="product in products"
          :key="product.id"
          class="product-card"
        >
          <img
            :src="product.image"
            class="product-image"
            alt="Imagem do produto"
          />

          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>

            <div class="product-footer">
              <span class="price">
                R$ {{ product.price.toFixed(2).replace('.', ',') }}
              </span>

              <button class="btn-presentear" type="button" @click="presentear(product)">
                Presentear
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="selectedProduct" class="selected-area">
      <p>
        Você escolheu:
        <strong>{{ selectedProduct.name }}</strong> —
        <span>R$ {{ selectedProduct.price.toFixed(2).replace('.', ',') }}</span>
      </p>
      <p class="hint">
        Na próxima etapa, vamos para a tela de confirmação e pagamento. 💌
      </p>
    </section>
  </main>
</template>

<style scoped>
/* Base */
.container {
  min-height: 100vh;
  padding: 2.5rem 1.5rem 2.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Variáveis de tema */
.theme-dark {
  --bg: #171320;
  --bg-card: #241729;
  --bg-card-soft: #2c1c33;
  --text: #f9f5ff;
  --muted: #c4b5fd;
  --price: #fbbf24;
  --button-bg: #f97316;
  --button-bg-hover: #ea580c;
  --card-border: rgba(244, 114, 182, 0.15);
}

.theme-light {
  --bg: #fff7f4; /* pêssego bem soft */
  --bg-card: #ffffff;
  --bg-card-soft: #ffe9f0;
  --text: #402b3f;
  --muted: #9b728d;
  --price: #22c55e;
  --button-bg: #ec4899; /* rosa chá de panela */
  --button-bg-hover: #db2777;
  --card-border: rgba(236, 72, 153, 0.28);
}

.theme-dark {
  background-color: var(--bg);
  color: var(--text);
}

.theme-light {
  background-color: var(--bg);
  color: var(--text);
}

/* Toggle de tema */
.theme-toggle {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 1;
  backdrop-filter: blur(12px);
  z-index: 20;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.theme-dark .theme-toggle {
  background: rgba(17, 24, 39, 0.85);
  color: #f9f5ff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
}

.theme-light .theme-toggle {
  background: rgba(255, 255, 255, 0.9);
  color: #4b2340;
  box-shadow: 0 10px 25px rgba(148, 27, 89, 0.2);
}

.theme-toggle:hover {
  transform: translateY(-1px);
}

.theme-toggle .icon {
  font-size: 1.1rem;
}

.theme-toggle .label {
  font-weight: 500;
}

/* Hero / título */
.hero {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  max-width: 680px;
}

.hero h1 {
  font-size: 2.2rem;
  margin-bottom: 0.3rem;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--muted);
}

/* Produtos */
.products-section {
  width: 100%;
  max-width: 1080px;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.6rem;
}

.product-card {
  background: linear-gradient(
    135deg,
    var(--bg-card),
    var(--bg-card-soft)
  );
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--card-border);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  border-color: rgba(244, 114, 182, 0.55);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 0.9rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.product-name {
  font-size: 1.05rem;
  margin: 0;
}

.product-description {
  font-size: 0.9rem;
  margin: 0;
  color: var(--muted);
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.7rem;
}

.price {
  font-weight: 700;
  font-size: 1rem;
  color: var(--price);
}

/* Botão */
.btn-presentear {
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: var(--button-bg);
  color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background-color 0.15s ease,
    transform 0.1s ease,
    box-shadow 0.15s ease;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
}

.btn-presentear:hover {
  background: var(--button-bg-hover);
  transform: translateY(-1px);
}

.btn-presentear:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Seção de produto selecionado */
.selected-area {
  margin-top: 2.2rem;
  width: 100%;
  max-width: 650px;
  padding: 1.1rem 1.3rem;
  border-radius: 0.9rem;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(148, 27, 89, 0.4);
  font-size: 0.95rem;
}

.theme-light .selected-area {
  background: #ffe9f2;
  border-color: rgba(236, 72, 153, 0.5);
}

.hint {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: var(--muted);
}

/* Responsividade */
@media (min-width: 900px) {
  .container {
    padding: 3rem 3rem 3rem;
  }
}
</style>
