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
            Estamos muito felizes em ter você aqui! 
          </p>
          <p>
            Cada detalhe do nosso novo lar está sendo preparado com muito carinho!! 
          </p>
          <p>
            Gostaríamos de informar que todos os presentes listados neste site são fictícios. Decidimos por este modelo para que o valor arrecadado seja destinado à compra do nosso enxoval físico, garantindo que tudo combine com as cores e o estilo que planejamos para a nossa casa.
          </p>
          <p>
            Esperamos que entendam e, desde já, agradecemos imensamente pelo apoio e por fazerem parte da nossa história!
          </p>
          
          <div class="modal-image-wrapper">
            <img src="/imagem.jpg" alt="Foto do Casal" class="modal-image" />
          </div>

          <button class="btn-action btn-ok" @click="closeWelcomeModal">OK</button>
        </div>
      </div>
    </transition>

    <div class="container">
      <header class="hero">
        <h1>Chá 🏠 </h1>
        <p class="hero-subtitle">
          Presentes para novos começos e momentos especiais.
        </p>
        <div class="hero-signature">
          Com carinho, <br />
          <strong>Camilly e André</strong>
        </div>
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
          <strong>{{ selectedProduct.name }}</strong>

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
  margin-bottom: 4rem;
  padding: 3rem 1rem;
  background: var(--hero-bg);
  border-radius: 30px;
  box-shadow: var(--hero-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid var(--hero-border);
}
.hero h1 { 
  font-size: 3rem; 
  margin-bottom: 1rem; 
  background: linear-gradient(to right, var(--primary), #fb7185);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -1px;
}
.hero-subtitle { 
  opacity: 0.85; 
  font-size: 1.15rem;
  max-width: 600px;
  margin: 0 auto;
}

.hero-signature {
  margin-top: 1.5rem;
  font-size: 1.05rem;
  opacity: 0.9;
  color: var(--text);
}

.hero-signature strong {
  display: inline-block;
  margin-top: 0.3rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary);
  font-family: 'Outfit', sans-serif;
}


/* Grid Mágica */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* --- CARDS --- */
.card {
  background: var(--card-bg);
  border: 1px solid rgba(236, 72, 153, 0.1);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.05);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(236, 72, 153, 0.15);
}

.card:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 4px;
}

.card-image-wrapper {
  height: 220px;
  overflow: hidden;
  position: relative;
}
.card-image-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0; height: 30px;
  background: linear-gradient(to top, var(--card-bg) 0%, transparent 100%);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover img { transform: scale(1.05); }

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1; 
  gap: 0.5rem;
}

.card-content h2 {
  font-size: 1.3rem;
  color: var(--text);
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.2rem;
  border-top: 1px dashed rgba(236, 72, 153, 0.2);
}

.price {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--primary);
  background: rgba(236, 72, 153, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
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
  max-height: 85vh; /* Ocupa no máximo 85% da tela pra não encher a tela toda */
  overflow-y: auto; /* Permite rolar se o celular for pequeno */
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  /* Estilos bonitos pra barra de rolagem */
  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}
.modal-content::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 6px;
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

.modal-image-wrapper {
  margin: 1.5rem auto;
  padding: 8px;
  background: var(--card-bg);
  border: 3px dashed var(--primary);
  border-radius: 20px;
  max-width: 90%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.modal-image-wrapper:hover {
  transform: scale(1.03);
}

.modal-image {
  width: 100%;
  max-height: 35vh; /* Evita que a imagem ocupe a tela toda no mobile caso seja muito vertical */
  object-fit: contain;
  border-radius: 12px;
  display: block;
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
