<script setup lang="ts">
import { QInput, QIcon } from 'quasar'
import { ref } from 'vue'
import { createId } from '@/utils/build-id'

const id = ref(createId())
/**
 * @todo
 * - Prop using ref from parent instead
 * - Validator
 * - Events
 */
</script>

<template>
  <QInput v-model="id" dense filled label="Id" color="primary">
    <template v-slot:append>
      <QIcon name="autorenew" @click="id = createId()" class="cursor-pointer" />
    </template>
  </QInput>
</template>
