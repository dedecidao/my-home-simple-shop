<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Pegamos o ID do pedido que você enviou via external_reference
const idPedido = route.query.external_reference || 'N/A'

const voltarInicio = () => router.push('/')
</script>

<template>
  <div class="container feedback-page">
    <div class="card feedback-card">
      <div class="icon-wrapper pending">
        <span>⏳</span>
      </div>
      
      <h1>Quase lá!</h1>
      <p class="description">
        Recebemos as informações do seu presente. Se você optou por <strong>Pix ou Boleto</strong>, 
        estamos apenas aguardando a confirmação do Mercado Pago.
      </p>

      <div class="order-info">
        <span>Código do Pedido:</span>
        <strong>{{ idPedido }}</strong>
      </div>

      <div class="info-box">
        <p>Assim que o pagamento for aprovado, você receberá um e-mail de confirmação automático enviado por nós! 🚀</p>
      </div>

      <button @click="voltarInicio" class="btn-action">Voltar para o site</button>
    </div>
  </div>
</template>

<style scoped>
.feedback-page { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 80vh; 
  padding: 2rem;
  background: var(--bg);
  color: var(--text);
}
.feedback-card { 
  max-width: 500px; 
  text-align: center; 
  padding: 3rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.icon-wrapper { font-size: 4rem; margin-bottom: 1.5rem; }
.description { opacity: 0.8; line-height: 1.6; margin-bottom: 2rem; }
.order-info { 
  background: rgba(0,0,0,0.05); 
  padding: 1rem; 
  border-radius: 12px; 
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  border: 1px solid var(--card-border);
}
.info-box { 
  border-left: 4px solid var(--primary); 
  background: rgba(249, 115, 22, 0.05); 
  padding: 1rem; 
  margin-bottom: 2rem;
  font-size: 0.85rem;
  text-align: left;
}
.btn-action { 
  background: var(--primary); 
  color: white; 
  border: none; 
  padding: 1rem 2rem; 
  border-radius: 50px; 
  font-weight: 600; 
  cursor: pointer;
}
</style>