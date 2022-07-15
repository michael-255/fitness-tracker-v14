<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/enums'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  title: 'Create' | 'Report' | 'Details' | 'Edit' | ''
  message: string
  details: any
  dialog: boolean
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
  (eventName: 'save'): void
}>()

const dialog = useVModel(props, 'dialog', emits)

function save() {
  emits('save')
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
        <QBtn
          v-if="title === 'Create' || title === 'Edit'"
          outline
          :icon="Icon.SAVE"
          label="Save"
          @click="save()"
        />
        <QBtn outline :icon="Icon.CLOSE" label="Close" v-close-popup />
      </QCardActions>

      <QCardSection class="q-table__title text-weight-bold">{{ message }}</QCardSection>

      <QCardSection>
        <div v-if="title === 'Details'">
          <div v-for="(value, key, i) in details" :key="i">
            <div class="q-mb-sm">
              <div class="text-subtitle1 text-weight-bold">{{ key }}</div>
              <div>{{ value || '-' }}</div>
            </div>
          </div>
        </div>

        <slot v-else />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
