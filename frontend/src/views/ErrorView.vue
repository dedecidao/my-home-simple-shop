<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const tentarNovamente = () => router.push('/')
</script>

<template>
  <div class="container feedback-page">
    <div class="card feedback-card">
      <div class="icon-wrapper error">
        <span>❌</span>
      </div>
      
      <h1>Ops, algo deu errado!</h1>
      <p class="description">
        Não conseguimos processar o seu pagamento neste momento. Pode ser uma instabilidade no cartão ou o pagamento foi cancelado.
      </p>

      <div class="help-box">
        <p>Não se preocupe! Você pode tentar novamente com outro método de pagamento ou entrar em contato conosco se precisar de ajuda.</p>
      </div>

      <div class="actions">
        <button @click="tentarNovamente" class="btn-action">Tentar Novamente</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Aproveita os mesmos estilos acima, mudando apenas cores se desejar */
.icon-wrapper.error { color: #ef4444; }
.help-box { 
  background: #fef2f2; 
  border-left: 4px solid #ef4444; 
  padding: 1rem; 
  margin-bottom: 2rem;
  font-size: 0.85rem;
}
.feedback-page { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
.feedback-card { max-width: 500px; text-align: center; padding: 3rem; background: white; border-radius: 20px; }
.btn-action { background: #ef4444; color: white; border: none; padding: 1rem 2rem; border-radius: 50px; cursor: pointer; }
</style>