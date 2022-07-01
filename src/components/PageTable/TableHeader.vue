<script setup lang="ts">
import { QSpace, QBtn } from 'quasar'

const props = defineProps<{
  tableName: string
  createFunc: () => void | undefined
  clearFunc: () => void | undefined
}>()
</script>

<template>
  <div class="q-table__title text-weight-bold">{{ props.tableName }}</div>
  <QSpace />
  <QBtn v-if="createFunc" color="positive" label="Create" class="q-mr-sm" @click="createFunc()" />
  <QBtn v-if="clearFunc" color="negative" label="Clear" @click="clearFunc()" />
</template>

<style></style>
