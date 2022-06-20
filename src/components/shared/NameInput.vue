<script setup lang="ts">
import { QInput, QIcon } from 'quasar'
import { ref } from 'vue'

const name = ref('Activity')
/**
 * @todo
 * - Prop using ref from parent instead
 * - Validator
 * - Events
 */
</script>

<template>
  <QInput v-model="name" dense filled label="Name" color="primary">
    <template v-slot:append>
      <QIcon name="close" @click="name = ''" class="cursor-pointer" />
    </template>
  </QInput>
</template>
