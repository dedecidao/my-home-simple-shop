<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Pegamos o ID do pedido da URL, se existir (o external_reference que enviamos)
const pedidoId = route.query.external_reference || 'Não identificado'

const voltarParaLoja = () => {
  router.push('/')
}
</script>

<template>
  <main class="error-container">
    <div class="card error-card">
      <div class="icon-box">
        <span>⚠️</span>
      </div>
      
      <h1>Ops, algo deu errado!</h1>
      
      <p class="description">
        Não conseguimos processar o seu pagamento no momento. 
        Pode ter sido um cancelamento ou uma falha de comunicação com o Mercado Pago.
      </p>

      <div class="info-box" v-if="pedidoId !== 'Não identificado'">
        <small>Referência do Pedido:</small>
        <strong>{{ pedidoId }}</strong>
      </div>

      <button @click="voltarParaLoja" class="btn-action">
        Tentar Novamente
      </button>

      <p class="support-text">
        Se o problema persistir, entre em contato com o André ou a Camilly.
      </p>
    </div>
  </main>
</template>

<style scoped>
/* Reset de fonte para garantir que fique bonito */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.error-container {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg);
  color: var(--text);
  padding: 20px;
}

.error-card {
  max-width: 450px;
  width: 100%;
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid var(--card-border);
}

.icon-box {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h1 {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.description {
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.info-box {
  background: rgba(0,0,0,0.05);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid var(--card-border);
}

.info-box small {
  opacity: 0.7;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-box strong {
  color: var(--text);
}

.btn-action {
  background: var(--primary); 
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 100px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.btn-action:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.support-text {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  opacity: 0.6;
}
</style>