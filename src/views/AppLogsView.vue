<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import TabTable from '@/components/TabTable.vue'
</script>

<template>
  <TabTable :table="DBTable.APP_LOGS" />
</template>
