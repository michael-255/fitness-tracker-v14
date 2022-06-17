<script setup lang="ts">
import type { Icon } from '@/constants'
import { QDialog, QCard, QCardSection, QCardActions, QIcon, QBtn } from 'quasar'
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
    <QCard>
      <QCardSection :class="`bg-${props.color} text-white`">
        <QIcon :name="props.icon" size="sm" class="q-pb-sm" />
        <span class="text-h6 q-pl-md">{{ title }}</span>
      </QCardSection>

      <QCardSection>{{ message }}</QCardSection>

      <QCardActions align="right">
        <QBtn flat label="Cancel" v-close-popup />
        <QBtn
          flat
          label="Confirm"
          :color="props.color"
          v-close-popup
          @click="emits('confirm:dialog')"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
