<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/enums'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  title: string
  message: string
  dialog: boolean
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
}>()

const dialog = useVModel(props, 'dialog', emits)

function save() {
  console.log('test')
}
</script>

<template>
  <QDialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">{{ title }}</div>
        <QSpace />
        <QBtn outline rounded size="sm" :icon="Icon.SAVE" label="Save" @click="save()" />
        <QBtn outline rounded size="sm" :icon="Icon.CLOSE" label="Close" v-close-popup />
      </QCardActions>

      <QCardSection class="q-table__title text-weight-bold">{{ message }}</QCardSection>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
