<script setup lang="ts">
import { QSelect } from 'quasar'
import { Icon, DBTable } from '@/constants/enums'
import { useTable } from '@/use/useTable'

const props = defineProps<{
  table: DBTable
  tableName: string
  tableColumns: any[]
  columnOptions: any[]
  visibleColumns: string[]
  showCreate: boolean
  showReport: boolean
  showEdit: boolean
}>()

const {
  tableVisibleColumns,
  tableColumnOptions,
  tableColumns,
  tableRows,
  rowDetails,
  selectedRowId,
  createDialog,
  clearDialog,
  reportDialog,
  detailsDialog,
  editDialog,
  deleteDialog,
  openCreateDialog,
  saveCreateDialog,
  openClearDialog,
  confirmClearDialog,
  openReportDialog,
  openDetailsDialog,
  openEditDialog,
  saveEditDialog,
  openDeleteDialog,
  confirmDeleteDialog,
} = useTable({
  table: props.table,
  tableColumns: props.tableColumns,
  columnOptions: props.columnOptions,
  visibleColumns: props.visibleColumns,
})

function test(val: any) {
  console.log(val)
}
</script>

<template>
  <QTable
    :rows="tableRows"
    :columns="tableColumns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
    row-key="id"
    :visible-columns="tableVisibleColumns"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ tableName }}</div>
      <QSpace />
      <QSelect
        v-model="tableVisibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="tableColumnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm"
      />
      <div>
        <QBtn v-if="showCreate" color="positive" label="Create" class="q-mr-sm" />
        <QBtn color="negative" label="Clear" />
      </div>
    </template>

    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
        <QTh auto-width />
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <QBtn
            v-if="showReport"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            @click="test(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="test(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <QBtn
            v-if="showEdit"
            flat
            round
            dense
            class="q-ml-xs"
            color="warning"
            @click="test(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="test(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>
</template>
