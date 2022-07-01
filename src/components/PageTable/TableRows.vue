<script setup lang="ts">
import { QTr, QTd, QBtn } from 'quasar'

const props = defineProps<{
  tableRows: any[]
}>()
</script>

<template>
  <QTr :props="props">
    <QTd v-for="col in props.tableRows" :key="col.name" :props="props">
      {{ col.value }}
    </QTd>
    <QTd auto-width>
      <QBtn
        flat
        round
        color="primary"
        @click="openReportDialog(props.tableRows[0].value)"
        :icon="Icon.REPORT"
      />
      <QBtn
        flat
        round
        color="info"
        @click="openDetailsDialog(props.tableRows[0].value)"
        :icon="Icon.DETAILS"
      />
      <QBtn
        flat
        round
        color="warning"
        @click="openEditDialog(props.tableRows[0].value)"
        :icon="Icon.EDIT"
      />
      <QBtn
        flat
        round
        color="negative"
        @click="openDeleteDialog(props.tableRows[0].value)"
        :icon="Icon.DELETE"
      />
    </QTd>
  </QTr>
</template>
