<script setup lang="ts">
import { QInput, QIcon, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { ref } from 'vue'

const date = ref(new Date().toISOString())
const pickers = ref(false)
/**
 * @todo
 * - Prop using ref from parent instead
 * - Date Picker
 * - Validator
 * - Events
 */
</script>

<template>
  <QInput v-model="date" dense filled label="Created At" color="primary">
    <!-- <template v-slot:append>
      <QIcon name="event" @click="pickers = true" class="cursor-pointer" />
    </template> -->
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <!-- <QDate v-model="date"> </QDate> -->
          <QTime v-model="date"> </QTime>
          <QBtn v-close-popup label="Close" color="primary" flat />
        </QPopupProxy>
      </q-icon>
    </template>
  </QInput>

  <!-- <div class="q-gutter-md row items-start">
    <QDate v-model="pickers" mask="YYYY-MM-DD HH:mm" />
    <QTime v-model="pickers" mask="YYYY-MM-DD HH:mm" />
  </div> -->
</template>
