<script setup lang="ts">
import { QInput, QIcon } from 'quasar'
import { ref } from 'vue'

const description = ref('')
/**
 * @todo
 * - Prop using ref from parent instead
 * - Validator
 * - Events
 */
</script>

<template>
  <QInput v-model="description" dense filled label="Description" color="primary">
    <template v-slot:append>
      <QIcon description="close" @click="description = ''" class="cursor-pointer" />
    </template>
  </QInput>
</template>
