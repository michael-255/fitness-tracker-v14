<script setup lang="ts">
import { QSelect } from 'quasar'
import { ActivityStatus } from '@/constants/enums'
import { ref } from 'vue'

const options: string[] = []

for (const value of Object.values(ActivityStatus)) {
  options.push(value)
}

const status = ref('Enabled')

/**
 * @todo
 * - Prop using ref from parent instead
 * - Validator
 * - Events
 */
</script>

<template>
  <QSelect v-model="status" :options="options" dense filled label="Status" color="primary">
  </QSelect>
</template>
