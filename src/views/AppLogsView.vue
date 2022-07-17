<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import TabContent from '@/components/TabContent.vue'
</script>

<template>
  <TabContent :table="DBTable.APP_LOGS" />
</template>
