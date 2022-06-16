<script setup lang="ts">
import type { Icon } from '@/constants'
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  icon: Icon
  message: string
  color: string
  dialog: boolean
}>()

const emits = defineEmits<{
  (eventName: 'toggle:dialog', bool: boolean): void
  (eventName: 'confirm:dialog'): void
}>()

const dialog = computed({
  get() {
    return props.dialog
  },
  set(bool) {
    emits('toggle:dialog', !!bool)
  },
})
</script>

<template>
  <QDialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
    <QCard class="bg-teal text-white">
      <QCardSection>
        <div class="text-h6">{{ title }}</div>
      </QCardSection>

      <QCardSection class="q-pt-none">{{ message }}</QCardSection>

      <QCardActions align="right" class="bg-white text-teal">
        <QBtn flat label="Cancel" color="primary" v-close-popup />
        <QBtn flat label="Confirm" color="primary" v-close-popup @click="emits('confirm:dialog')" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
