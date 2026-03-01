<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// O @ geralmente é um atalho para a pasta 'src' configurado no Vite
import { products } from '@/data/products.js'

const selectedProduct = ref(null)

const presentear = (product) => selectedProduct.value = product

const confirmarPresente = () => {
  if (selectedProduct.value) {

    router.push({
      name: 'checkout', // Nome da sua rota de destino (Ex: Checkout, Confirmacao)
      params: { productId: selectedProduct.value.id  } // Passa o ID do produto e os dados como string JSON
    })


  }
}

// Lógica do Modal de Boas Vindas
const showWelcomeModal = ref(false)
const greeting = ref('')

onMounted(() => {
  // Configura a saudação baseada na hora
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    greeting.value = 'Bom dia'
  } else if (hour >= 12 && hour < 18) {
    greeting.value = 'Boa tarde'
  } else {
    greeting.value = 'Boa noite'
  }

  // Verifica se o modal já foi fechado nesta sessão
  const checkModalFechado = sessionStorage.getItem('welcomeModalClosed')
  if (!checkModalFechado) {
    showWelcomeModal.value = true
  }
})

const closeWelcomeModal = () => {
  showWelcomeModal.value = false
  sessionStorage.setItem('welcomeModalClosed', 'true')
}
</script>



<template>
  <main>
    <!-- Welcome Modal -->
    <transition name="modal-fade">
      <div v-if="showWelcomeModal" class="modal-overlay">
        <div class="modal-content">
          <h2>{{ greeting }}!</h2>
          <p>
            Ficamos muito felizes em ter você aqui! Eu e a Camilly estamos preparando cada detalhe do nosso <b>novo lar</b> com muito carinho.
          </p>
          <p>
            Gostaríamos de informar que todos os presentes listados neste site são <b>fictícios</b>. Decidimos por este modelo para que o valor arrecadado seja <b>destinado à compra do nosso enxoval físico</b>, garantindo que tudo combine com as <b>cores e o estilo</b> que planejamos para a nossa casa.
          </p>
          <p>
            Esperamos que entendam e, desde já, <b>agradecemos imenso pelo apoio</b> e por fazerem parte da nossa história!
          </p>
          <button class="btn-action btn-ok" @click="closeWelcomeModal">OK</button>
        </div>
      </div>
    </transition>

    <div class="container">
      <header class="hero">
        <h1>Chá </h1>
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
            <h2>{{ product.name }}</h2>
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
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.card:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 4px;
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

.card-content h2 {
  font-size: 1.2rem;
  color: var(--text);
  margin-bottom: 0.2rem;
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

/* --- MODAL DE BOAS-VINDAS --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 1.5rem;
}

.modal-content {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 550px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.modal-content h2 {
  color: var(--primary);
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.modal-content p {
  margin-bottom: 1.2rem;
  line-height: 1.6;
  font-size: 1.05rem;
  color: var(--text);
  opacity: 0.9;
}

.btn-ok {
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 30px;
}

/* Animação do Modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-content {
  animation: modalPopIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalPopIn {
  from {
    transform: scale(0.9) translateY(20px);
  }
  to {
    transform: scale(1) translateY(0);
  }
}
</style>
