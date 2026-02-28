<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const paymentId = ref(route.query.payment_id || 'N/A')
const status = ref(route.query.status || 'pending')

const fecharJanela = () => {
  // Se estiver em um pop-up, tenta fechar a janela
  window.close()
  // Caso não feche (limitação de alguns browsers), avisa o usuário
  alert("Pagamento processado! Você já pode fechar esta aba e voltar para a loja.")
}
</script>

<template>
  <main class="success-page">
    <div class="card">
      <div v-if="status === 'approved'" class="icon-check">✅</div>
      <div v-else class="icon-wait">⏳</div>

      <h1>{{ status === 'approved' ? 'Pagamento Confirmado!' : 'Recebemos seu pedido!' }}</h1>
      
      <div class="details">
        <p><strong>ID do Pagamento:</strong> {{ paymentId }}</p>
        <p v-if="status === 'approved'">Sua compra foi aprovada e já está na nossa planilha!</p>
        <p v-else>Estamos aguardando a compensação (comum em Pix ou Boleto).</p>
      </div>

      <button @click="fecharJanela" class="btn-close">Concluir e Fechar</button>
    </div>
  </main>
</template>

<style scoped>
.success-page {
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; background: #171320; color: white; padding: 20px;
}
.card {
  background: #241729; border: 1px solid rgba(244, 114, 182, 0.3);
  padding: 2.5rem; border-radius: 20px; text-align: center; max-width: 400px;
}
.icon-check { font-size: 5rem; margin-bottom: 1rem; }
.icon-wait { font-size: 5rem; margin-bottom: 1rem; filter: sepia(1); }
h1 { color: #f97316; margin-bottom: 1rem; font-size: 1.8rem; }
.details { margin: 1.5rem 0; font-size: 1rem; opacity: 0.9; line-height: 1.6; }
.btn-close {
  background: #f97316; color: white; border: none; padding: 1rem 2rem;
  border-radius: 30px; font-weight: bold; cursor: pointer; transition: 0.3s;
}
.btn-close:hover { background: #ea580c; transform: scale(1.05); }
</style>