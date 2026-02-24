<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// Importa o "banco de dados" de produtos
import { products } from '@/data/products.js'

const props = defineProps({
  productId: { type: [String, Number], required: true }
})

const router = useRouter()

// --- 1. LÓGICA DO TEMA (Igual à Home) ---
const isLightTheme = ref(false)
const toggleTheme = () => isLightTheme.value = !isLightTheme.value

// --- 2. DADOS DO PRODUTO ---
const product = computed(() => products.find(p => p.id == props.productId))

// --- 3. FORMULÁRIO ---
const form = ref({
  name: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})
const isLoading = ref(false)

// --- 4. AÇÕES ---
const voltar = () => router.push('/')

const testarConexao = async () => {
  const urlApi = "https://script.google.com/macros/s/AKfycbwkFHlfY9LVfX17897oyaluhbFJHtGIzpnFwrMKDZxOgxb3F6tzmbgPpsByojjOEka9vA/exec" 

  console.log("🚀 Iniciando teste de conexão...")
  isLoading.value = true

  const dadosDeTeste = {
    teste: "Oi Google!",
    origem: "Botão de Teste Vue",
    produto: product.value?.name,
    total: product.value?.price
  }

  try {
    const response = await fetch(urlApi, {
      method: "POST",
      redirect: "follow", // OBRIGATÓRIO para Google Scripts
      body: JSON.stringify(dadosDeTeste)
    })

    const result = await response.json()
    console.log("✅ Resposta do Google:", result)
    alert(`Conexão OK!\nO Google respondeu: ${result.status}`)
    
  } catch (error) {
    console.error("❌ Erro no teste:", error)
    alert("Erro ao conectar. Verifique a URL e se fez o Deploy corretamente.")
  } finally {
    isLoading.value = false
  }
}

const finalizarCompra = async () => {
  // Validação simples
  if (!form.value.name || !form.value.cardNumber) {
    alert("Preencha os dados obrigatórios.")
    return
  }

  isLoading.value = true

  // >>> AQUI ENTRA A INTEGRAÇÃO COM API DE PAGAMENTO (Stripe, Pagar.me, etc) <<<
  // Exemplo: await api.post('/checkout', { ...form.value, amount: product.value.price })

  setTimeout(() => {
    isLoading.value = false
    alert(`Sucesso! Pagamento de R$ ${product.value.price} confirmado.`)
    router.push('/')
  }, 1500)
}
</script>

<template>
  <!-- Wrapper principal para controlar o Tema (Dark/Light) -->
  <main :class="['app-wrapper', isLightTheme ? 'light' : 'dark']">

    <!-- Botão de Trocar Tema (Posição absoluta igual à Home) -->
    <button class="theme-btn" @click="toggleTheme" :title="isLightTheme ? 'Modo Escuro' : 'Modo Claro'">
      {{ isLightTheme ? '🌙' : '☀️' }}
    </button>

    <div class="container checkout-page">

      <!-- Botão Voltar -->
      <button @click="voltar" class="btn-back">← Escolher outro presente</button>

      <!-- Grid Principal do Checkout -->
      <div v-if="product" class="checkout-grid">

        <!-- COLUNA 1: Resumo do Item -->
        <section class="card summary-card">
          <div class="card-image-wrapper">
             <img :src="product.image" :alt="product.name" />
          </div>
          <div class="card-content">
            <h2>Resumo</h2>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price-row">
              <span>Total a pagar:</span>
              <span class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</span>
            </div>
          </div>
        </section>

        <!-- COLUNA 2: Formulário de Pagamento -->
        <section class="card payment-card">
          <div class="card-content">
            <h2>Dados de Pagamento</h2>

            <form @submit.prevent="finalizarCompra" class="payment-form">
              <div class="form-group">
                <label>Nome no Cartão</label>
                <input type="text" v-model="form.name" placeholder="Nome impresso" required />
              </div>

              <div class="form-group">
                <label>Número do Cartão</label>
                <input type="text" v-model="form.cardNumber" placeholder="0000 0000 0000 0000" maxlength="19" required />
              </div>

              <div class="row-2-col">
                <div class="form-group">
                  <label>Validade</label>
                  <input type="text" v-model="form.expiry" placeholder="MM/AA" maxlength="5" required />
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input type="text" v-model="form.cvv" placeholder="123" maxlength="4" required />
                </div>
              </div>

              <button type="submit" class="btn-action full-width" :disabled="isLoading">
                {{ isLoading ? 'Processando...' : 'Confirmar Pagamento' }}
              </button>

              <button 
                type="button" 
                @click="testarConexao" 
                class="btn-test" 
                :disabled="isLoading"
              >
                {{ isLoading ? 'Aguarde...' : '🧪 Testar API Google' }}
              </button>

              <p class="secure-note">🔒 Ambiente Seguro</p>
            </form>
          </div>
        </section>
      </div>

      <!-- Erro 404 -->
      <div v-else class="error-msg">
        <h2>Produto não encontrado</h2>
        <button class="btn-action" @click="voltar">Voltar</button>
      </div>

    </div>
  </main>
</template>

<style scoped>

  .btn-test {
  background: transparent;
  color: var(--primary);
  border: 1px dashed var(--primary);
  padding: 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
  width: 100%;
  margin-top: 10px;
  font-size: 0.9rem;
}

.btn-test:hover {
  background: rgba(249, 115, 22, 0.1); /* Um leve brilho da cor primária */
}

.btn-test:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
/* --- CONFIGURAÇÕES DO TEMA (Copiado da Home para consistência) --- */
.app-wrapper {
  /* Dark Mode Default */
  --bg: #171320;
  --text: #f9f5ff;
  --card-bg: #241729;
  --card-border: rgba(244, 114, 182, 0.15);
  --primary: #f97316;
  --primary-hover: #ea580c;

  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: background 0.3s, color 0.3s;
  padding-bottom: 40px;
}

.app-wrapper.light {
  /* Light Mode */
  --bg: #fff7f4;
  --text: #402b3f;
  --card-bg: #ffffff;
  --card-border: rgba(236, 72, 153, 0.2);
  --primary: #ec4899;
  --primary-hover: #db2777;
}

/* --- CONTAINER E LAYOUT --- */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Duas colunas no Desktop */
  gap: 2rem;
  margin-top: 1rem;
}

/* --- ESTILOS GERAIS (Botões e Cards) --- */
.btn-back {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  display: inline-block;
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
  z-index: 10;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  height: fit-content; /* Ajusta altura ao conteúdo */
}

/* --- CARD RESUMO --- */
.card-image-wrapper img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-content {
  padding: 2rem;
}

.card-content h2 {
  color: var(--primary);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-content h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--card-border);
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

/* --- FORMULÁRIO --- */
.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

input {
  width: 100%;
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--text);
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

.row-2-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn-action {
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
  width: 100%;
  margin-top: 1rem;
  font-size: 1.1rem;
}
.btn-action:hover { background: var(--primary-hover); }

.secure-note {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
}

/* --- RESPONSIVIDADE --- */
@media (max-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr; /* Uma coluna no mobile */
  }

  /* Inverte a ordem visual: Resumo primeiro, Formulário depois (padrão do HTML)
     Se quisesse inverter, usaria order: -1 no CSS flex/grid */
}
</style>
