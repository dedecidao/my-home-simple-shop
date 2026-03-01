<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '@/data/products.js'

const props = defineProps({
  productId: { type: [String, Number], required: true }
})

const router = useRouter()

// --- 1. CONFIGURAÇÃO DA API (SUA URL NOVA) ---
const URL_API_GOOGLE = "https://script.google.com/macros/s/AKfycbwBgJWyHGBHlBiQRWnOq-q0qZe7Pd37wgOJTizp_I0ybmtyy_-wSZct1bOAcXFC1StyCQ/exec"


// --- 3. DADOS DO PRODUTO ---
const product = computed(() => products.find(p => p.id == props.productId))

// --- 4. FORMULÁRIO (Ajustado para o que a Planilha e o MP pedem) ---
const form = ref({
  name: '',
  email: '',
  presenca: '' // Campo obrigatório de presença
})
const isLoading = ref(false)

// --- 5. AÇÕES ---
const voltar = () => router.push('/')

const finalizarCompra = async () => {
  if (!form.value.name || !form.value.email) {
    alert("Preencha nome e e-mail.");
    return;
  }

  isLoading.value = true;

  const dadosPedido = {
    cliente: { nome: form.value.name, email: form.value.email, presenca: form.value.presenca },
    metodo: "Mercado Pago",
    total: product.value.price,
    itens: [{ nome: product.value.name, preco: product.value.price }]
  };

  try {
    const response = await fetch(URL_API_GOOGLE, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(dadosPedido)
    });

    const result = await response.json();

    if (result.status === "success" && result.linkPagamento) {
      // Configurações da janelinha
      const width = 600;
      const height = 700;
      const left = (window.screen.width / 2) - (width / 2);
      const top = (window.screen.height / 2) - (height / 2);

      // Abre como Pop-up centralizado
      window.open(
        result.linkPagamento, 
        "PagamentoMercadoPago", 
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=no,toolbar=no,menubar=no`
      );
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao abrir pagamento.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main>

    <div class="container checkout-page">
      <button @click="voltar" class="btn-back">← Voltar para a loja</button>

      <div v-if="product" class="checkout-grid">
        
        <section class="card summary-card">
          <div class="card-image-wrapper">
             <img :src="product.image" :alt="product.name" />
          </div>
          <div class="card-content">
            <h2>Seu Presente</h2>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price-row">
              <span>Total:</span>
              <span class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</span>
            </div>
          </div>
        </section>

        <section class="card payment-card">
          <div class="card-content">
            <h2>Dado </h2>
            <p class="info-text">Você será redirecionado para o Mercado Pago para escolher Pix ou Cartão com segurança.</p>

            <form @submit.prevent="finalizarCompra" class="payment-form">
              <div class="form-group">
                <label>Seu Nome Completo</label>
                <input type="text" v-model="form.name" placeholder="Como na identidade" required />
              </div>

              <div class="form-group">
                <label>E-mail</label>
                <input type="email" v-model="form.email" placeholder="onde receberá o comprovante" required />
              </div>

              <div class="form-group options-group">
                <label>Confirmação de Presença *</label>
                <label class="radio-label">
                  <input type="radio" name="presenca" value="Comparecerei presencialmente ao chá, na data 12 de abril de 2026 as 11:30" v-model="form.presenca" required />
                  <span>Comparecerei presencialmente ao chá, na data 12 de abril de 2026 às 11:30</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="presenca" value="Não poderei comparecer presencialmente" v-model="form.presenca" required />
                  <span>Não poderei comparecer presencialmente</span>
                </label>
              </div>

              <button type="submit" class="btn-action full-width" :disabled="isLoading">
                {{ isLoading ? 'Preparando Pagamento...' : 'Ir para Pagamento 🚀' }}
              </button>

              <div class="security-badges">
                <span>🔒 Pagamento Processado pelo Mercado Pago</span>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Aproveitando seus estilos e adicionando melhorias */
.info-text {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.security-badges {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.75rem;
  opacity: 0.6;
  border-top: 1px solid var(--card-border);
  padding-top: 1rem;
}


.container { width: 90%; max-width: 1100px; margin: 0 auto; padding-top: 2rem; }
.checkout-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; }
.card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; overflow: hidden; }
.card-image-wrapper img { width: 100%; height: 200px; object-fit: cover; }
.card-content { padding: 1.5rem; }
.price-row { display: flex; justify-content: space-between; margin-top: 1rem; font-weight: bold; font-size: 1.2rem; color: var(--primary); }
.form-group { margin-bottom: 1rem; }
input[type="text"], input[type="email"] { width: 100%; background: rgba(0,0,0,0.05); border: 1px solid var(--card-border); color: var(--text); padding: 12px; border-radius: 8px; }

.options-group label { display: block; margin-bottom: 0.5rem; }
.radio-label {
  display: flex !important;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  background: rgba(0,0,0,0.05);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  margin-top: 0.5rem;
  transition: 0.2s;
}
.radio-label:hover { background: rgba(0,0,0,0.1); }
.radio-label input[type="radio"] {
  width: auto;
  margin: 0;
  cursor: pointer;
  accent-color: var(--primary);
  transform: scale(1.2);
}
.btn-action { background: var(--primary); color: white; border: none; padding: 1rem; border-radius: 20px; font-weight: 600; cursor: pointer; width: 100%; }
.btn-back { background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 1rem; }

@media (max-width: 768px) { .checkout-grid { grid-template-columns: 1fr; } }
</style>