<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '@/data/products.js'

const props = defineProps({
  productId: { type: [String, Number], required: true }
})

const router = useRouter()

// --- 1. CONFIGURAÇÃO DA API (SUA URL NOVA) ---
const URL_API_GOOGLE = "https://script.google.com/macros/s/AKfycbzZriAWjrWt455NJ4LakLqH03fRLxBJgKPfh_EaMOUgtSuLjpa-c-I5PDlLMcDBv1qVeg/exec"


// --- 3. DADOS DO PRODUTO ---
const product = computed(() => products.find(p => p.id == props.productId))

// --- 4. FORMULÁRIO (Ajustado para o que a Planilha e o MP pedem) ---
const form = ref({
  name: '',
  email: '',
  presenca: '' // Campo obrigatório de presença
})
const isLoading = ref(false)
const errorMessage = ref('')

// --- 5. AÇÕES ---
onMounted(() => {
  window.scrollTo(0, 0)
})

const voltar = () => router.push('/')

const finalizarCompra = async () => {
  errorMessage.value = '';

  const nomeFormatado = form.value.name.trim();
  const emailFormatado = form.value.email.trim();
  const presencaSelecionada = form.value.presenca;

  if (!nomeFormatado || !emailFormatado || !presencaSelecionada) {
    errorMessage.value = "Por favor, preencha todos os campos obrigatórios (*).";
    return;
  }

  if (nomeFormatado.length < 3 || nomeFormatado.length > 100) {
    errorMessage.value = "O nome deve ter entre 3 e 100 caracteres.";
    return;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(emailFormatado) || emailFormatado.length > 150) {
    errorMessage.value = "Por favor, insira um endereço de e-mail válido.";
    return;
  }

  isLoading.value = true;

  const dadosPedido = {
    cliente: { nome: nomeFormatado, email: emailFormatado, presenca: presencaSelecionada },
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
    errorMessage.value = "Erro ao processar o pagamento. Tente novamente mais tarde.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main>

    <div class="container checkout-page">
      <button @click="voltar" class="btn-back">← Voltar</button>

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
            <h2>Dados (Precisamos saber quem você é) </h2>
            <p class="info-text">Você será redirecionado para o Mercado Pago para escolher Pix ou Cartão com segurança.</p>

            <form @submit.prevent="finalizarCompra" class="payment-form">
              <div class="form-group">
                <label>Seu nome completo *</label>
                <input 
                  type="text" 
                  v-model="form.name" 
                  placeholder="Como na identidade" 
                  required 
                  minlength="3" 
                  maxlength="100" 
                  autocomplete="name" 
                />
              </div>

              <div class="form-group">
                <label>E-mail *</label>
                <input 
                  type="email" 
                  v-model="form.email" 
                  placeholder="onde receberá o comprovante" 
                  required 
                  maxlength="150" 
                  autocomplete="email" 
                />
              </div>

              <div class="form-group options-group">
                <label>Confirmação de presença *</label>
                <label class="radio-label">
                  <input type="radio" name="presenca" value="Comparecerei presencialmente ao chá, na data 12 de abril de 2026 as 11:30" v-model="form.presenca" required />
                  <span>Comparecerei presencialmente ao chá, na data 12 de abril de 2026 às 11:30</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="presenca" value="Não poderei comparecer presencialmente" v-model="form.presenca" required />
                  <span>Não poderei comparecer presencialmente</span>
                </label>
              </div>

              <transition name="fade">
                <div v-if="errorMessage" class="error-message">
                  {{ errorMessage }}
                </div>
              </transition>

              <button type="submit" class="btn-action full-width btn-checkout" :disabled="isLoading">
                <span v-if="isLoading" class="spinner"></span>
                <span>{{ isLoading ? 'Preparando Pagamento...' : 'Ir para Pagamento 🚀' }}</span>
              </button>

              <div class="security-badges">
                <span class="badge-icon">🔒</span>
                <span>Pagamento Processado com Segurança pelo Mercado Pago</span>
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
.card { 
  background: var(--card-bg); 
  border: 1px solid rgba(236, 72, 153, 0.1); 
  border-radius: 24px; 
  overflow: hidden; 
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.05);
}
.card-image-wrapper img { width: 100%; height: 250px; object-fit: cover; }
.card-content { padding: 1.8rem; }
.price-row { display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px dashed rgba(236, 72, 153, 0.2); font-weight: bold; font-size: 1.2rem; color: var(--text); }
.price-row .price { color: var(--primary); background: rgba(236, 72, 153, 0.1); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 1.3rem; }
.form-group { margin-bottom: 1.2rem; }
.form-group label { font-weight: 500; font-size: 0.95rem; display: block; margin-bottom: 0.4rem; color: var(--text); }
input[type="text"], input[type="email"] { 
  width: 100%; 
  background: var(--card-bg); 
  border: 1px solid var(--card-border); 
  color: var(--text); 
  padding: 14px; 
  border-radius: 12px; 
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}
input[type="text"]:focus, input[type="email"]:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
}
input::placeholder { opacity: 0.5; }

.options-group label { display: block; margin-bottom: 0.5rem; }
.radio-label {
  display: flex !important;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  background: var(--card-bg);
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  margin-top: 0.5rem;
  transition: all 0.2s ease;
}
.radio-label:hover { border-color: var(--primary); background: rgba(236, 72, 153, 0.02); }
.radio-label input[type="radio"] {
  width: auto;
  margin: 0;
  cursor: pointer;
  accent-color: var(--primary);
  transform: scale(1.3);
}

.btn-checkout { 
  background: var(--primary); 
  color: white; 
  border: none; 
  padding: 1.2rem; 
  border-radius: 20px; 
  font-weight: 600; 
  font-size: 1.1rem;
  cursor: pointer; 
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
  margin-top: 1rem;
}
.btn-checkout:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
  background: var(--primary-hover);
}
.btn-checkout:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-back { 
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--card-bg); 
  border: 1px solid var(--card-border); 
  color: var(--text); 
  cursor: pointer; 
  margin-bottom: 2rem; 
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.btn-back:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.error-message {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  margin: 1.5rem 0;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.security-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--text);
  opacity: 0.7;
  border-top: 1px solid var(--card-border);
  padding-top: 1.5rem;
}
.badge-icon {
  font-size: 1.2rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) { .checkout-grid { grid-template-columns: 1fr; } }
</style>