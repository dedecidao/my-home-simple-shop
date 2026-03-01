<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

const isLightTheme = ref(true)

const updateBodyBackground = () => {
  document.body.style.backgroundColor = isLightTheme.value ? '#fff0f5' : '#171320'
  document.body.style.color = isLightTheme.value ? '#4a3641' : '#f9f5ff'
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isLightTheme.value = false
  }
  updateBodyBackground()
})

watch(isLightTheme, () => {
  updateBodyBackground()
})

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('theme', isLightTheme.value ? 'light' : 'dark')
}
</script>

<template>
  <div :class="['app-wrapper', isLightTheme ? 'light' : 'dark']">
    <!-- Botão de Tema no Canto Superior Direito -->
    <button class="global-theme-btn" @click="toggleTheme" :title="isLightTheme ? 'Ir para modo escuro' : 'Ir para modo claro'">
       {{ isLightTheme ? '🌙' : '☀️' }}
    </button>
    <RouterView />
  </div>
</template>

<style>
.global-theme-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--card-bg, #fff);
  border: 1px solid var(--card-border, #ccc);
  font-size: 1.2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.3s;
}
.global-theme-btn:hover {
  transform: scale(1.1);
}
</style>
