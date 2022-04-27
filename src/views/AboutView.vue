<script setup lang="ts">
import { QBtn } from 'quasar'
import { Links, Icons } from '@/constants'
</script>

<template>
  <h4>About</h4>
  Fitness Tracker created by Michael Joy
  <br />
  <QBtn class="q-my-sm" color="primary" label="GitHub" :icon="Icons.CODE" target="_blank" :href="Links.GITHUB" />
  <br />
  <QBtn disable color="primary" label="My Apps" :icon="Icons.WEB" target="_blank" :href="Links.MYAPPS" />
</template>
