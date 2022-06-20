<script setup lang="ts">
import { QToggle } from 'quasar'
import { ref } from 'vue'

const label = 'Track Pounds'
const bool = ref(false)
/**
 * @todo
 * - Prop using ref from parent instead
 * - Validator
 * - Events
 */
</script>

<template>
  <QToggle v-model="bool" dense filled :label="label" color="primary" />
</template>
