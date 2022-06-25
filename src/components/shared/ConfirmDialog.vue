<script setup lang="ts">
import type { Icon } from '@/constants/enums'
import { QDialog, QCard, QCardSection, QCardActions, QIcon, QBtn } from 'quasar'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  title: string
  icon: Icon
  message: string
  color: string
  dialog: boolean
  confirmFunc: () => any
}>()

const emits = defineEmits<{
  (eventName: 'update:dialog', bool: boolean): void
}>()

const dialog = useVModel(props, 'dialog', emits)
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
        <QBtn flat label="Confirm" :color="props.color" v-close-popup @click="confirmFunc()" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
