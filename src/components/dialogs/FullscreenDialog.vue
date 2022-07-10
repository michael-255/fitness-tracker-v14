<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { type Ref, ref } from 'vue'
import { DBTable, Icon } from '@/constants/enums'
import { useVModel } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { useConfirmDialog } from '@/use/useConfirmDialog'
import IdInput from '@/components/inputs/IdInput.vue'

const $q = useQuasar()
// const { notify } = useNotify($q)
const { confirmDialog } = useConfirmDialog($q)

const props = defineProps<{
  title: string
  table: DBTable
  dialog: boolean
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
}>()

const dialog = useVModel(props, 'dialog', emits)

const id: Ref<string> = ref('')
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
        <div class="q-table__title text-weight-bold">{{ props.title }}</div>
        <QSpace />
        <QBtn outline :icon="Icon.SAVE" label="Save" v-close-popup />
        <QBtn outline :icon="Icon.CLOSE" label="Close" v-close-popup />
      </QCardActions>

      <QCardSection>
        <IdInput v-if="table === DBTable.MEASUREMENTS" :id="id" @update:id="id = $event" />
        <IdInput v-if="table === DBTable.MEASUREMENT_RECORDS" :id="id" @update:id="id = $event" />
        <IdInput v-if="table === DBTable.MEASUREMENT_RECORDS" :id="id" @update:id="id = $event" />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
