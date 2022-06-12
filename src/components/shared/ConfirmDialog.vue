<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { ref } from 'vue'

const confirmDialog = ref(false)

defineProps<{
  title: string
  message: string
  dialog: boolean
}>()
</script>

<template>
  <QDialog v-model="confirmDialog" persistent transition-show="scale" transition-hide="scale">
    <QCard class="bg-teal text-white">
      <QCardSection>
        <div class="text-h6">Persistent</div>
      </QCardSection>

      <QCardSection class="q-pt-none"> Click/Tap on the backdrop. </QCardSection>

      <QCardActions align="right" class="bg-white text-teal">
        <QBtn flat label="OK" v-close-popup />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
