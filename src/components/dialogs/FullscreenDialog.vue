<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { DBTable, DialogType, Icon } from '@/constants/enums'
import { useVModel } from '@vueuse/core'
import { useTable } from '@/use/useTable'

const { getTableLabel } = useTable()

const props = defineProps<{
  table: DBTable
  dialog: boolean
  dialogType: DialogType
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
  (eventName: 'on-save'): void
}>()

const dialog = useVModel(props, 'dialog', emits)

function onSave() {
  emits('on-save')
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
        <div class="q-table__title text-weight-bold q-ml-sm">{{ dialogType }}</div>
        <QSpace />
        <QBtn
          v-if="dialogType === DialogType.CREATE || dialogType === DialogType.EDIT"
          outline
          :icon="Icon.SAVE"
          label="Save"
          @click="onSave()"
        />
        <QBtn outline :icon="Icon.CLOSE" label="Close" v-close-popup />
      </QCardActions>

      <QCardSection class="q-table__title text-weight-bold">
        {{ getTableLabel(table, false) }}
      </QCardSection>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
