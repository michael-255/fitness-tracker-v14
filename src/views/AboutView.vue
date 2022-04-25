<script setup lang="ts">
import { QBtn } from 'quasar'
import { Links, Icons } from '@/constants'
</script>

<template>
  <h3>About View</h3>
  Fitness Tracker created by Michael Joy
  <QBtn color="primary" label="GitHub" :icon="Icons.CODE" target="_blank" :href="Links.GITHUB" />
  <QBtn
    disabled
    color="primary"
    label="My Apps"
    :icon="Icons.WEB"
    target="_blank"
    :href="Links.MYAPPS"
  />
</template>
