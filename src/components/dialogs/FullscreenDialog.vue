<script setup lang="ts">
import { QDialog, QCard, QCardSection, QBtn } from 'quasar'
import { Icon } from '@/constants/enums'
import { computed, ref, type Ref } from 'vue'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'

const confirmDialog: Ref<boolean> = ref(false)

const props = defineProps<{
  title: string
  canSave: boolean
  dialog: boolean
}>()

const emits = defineEmits<{
  (eventName: 'toggle:fullDialog', bool: boolean): void
  (eventName: 'save:fullDialog'): void
}>()

const dialog = computed({
  get() {
    return props.dialog
  },
  set(bool) {
    emits('toggle:fullDialog', !!bool)
  },
})

function confirmSaveDialog() {
  emits('save:fullDialog')
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
    <QCard class="bg-primary text-white">
      <QBar>
        <div class="text-h6">{{ props.title }}</div>
        <QSpace />
        <QBtn dense flat icon="close" v-close-popup />
      </QBar>

      <QCardActions v-if="props.canSave">
        <QBtn label="Save Changes" color="white text-black" @click="confirmDialog = true" />
      </QCardActions>

      <QCardSection>
        <slot></slot>
      </QCardSection>
    </QCard>
  </QDialog>

  <ConfirmDialog
    title="Save"
    :icon="Icon.SAVE"
    message="Are you sure you'd like to save these changes?"
    color="primary"
    :dialog="confirmDialog"
    :confirmFunc="confirmSaveDialog"
    @update:dialog="confirmDialog = $event"
  />
</template>
