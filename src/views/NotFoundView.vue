<script setup lang="ts">
import { QBtn } from 'quasar'
import { Views, Icon } from '@/constants/enums'
</script>

<template>
  <h4>404 Not Found</h4>
  The page you are looking for no longer exists.
  <br />
  <QBtn
    class="q-my-sm"
    color="primary"
    label="Return to Dashboard"
    :icon="Icon.DASHBOARD"
    :to="{ name: Views.DASHBOARD }"
  />
</template>
