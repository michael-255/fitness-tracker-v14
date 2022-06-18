<script setup lang="ts">
import { QBtn, QTable, QTr, QTh, QTd, QSpace } from 'quasar'
import { useTable } from '@/use/useTable'
import { Icon, Store } from '@/constants'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import FullscreenDialog from './FullscreenDialog.vue'

const props = defineProps<{
  tableName: string
  store: Store
  tableColumns: any[]
}>()

const {
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
  store: props.store,
  tableColumns: props.tableColumns,
})
</script>

<template>
  <QTable :rows="tableRows" :columns="tableColumns" :rows-per-page-options="[10]">
    <!-- Table Header -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ props.tableName }}</div>
      <QSpace />
      <QBtn color="positive" label="Create" class="q-mr-sm" @click="openCreateDialog()" />
      <QBtn color="negative" label="Clear" @click="openClearDialog()" />
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
            flat
            color="primary"
            round
            @click="openReportDialog(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <QBtn
            flat
            color="info"
            round
            @click="openDetailsDialog(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <QBtn
            flat
            color="warning"
            round
            @click="openEditDialog(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <QBtn
            flat
            color="negative"
            round
            @click="openDeleteDialog(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Dialogs -->
  <FullscreenDialog
    title="Create"
    :canSave="true"
    :dialog="createDialog"
    @toggle:fullDialog="createDialog = !createDialog"
    @save:fullDialog="saveCreateDialog()"
  >
    <div>Not Implemented</div>
  </FullscreenDialog>

  <ConfirmDialog
    title="Clear"
    :icon="Icon.DELETE"
    :message="`Permanently clear all data from the '${props.store}' table in the database?`"
    color="negative"
    :dialog="clearDialog"
    @toggle:dialog="clearDialog = !clearDialog"
    @confirm:dialog="confirmClearDialog()"
  />

  <FullscreenDialog
    title="Report"
    :canSave="false"
    :dialog="reportDialog"
    @toggle:fullDialog="reportDialog = !reportDialog"
  >
    <div>Not Implemented</div>
  </FullscreenDialog>

  <FullscreenDialog
    title="Details"
    :canSave="false"
    :dialog="detailsDialog"
    @toggle:fullDialog="detailsDialog = !detailsDialog"
  >
    <div v-for="(item, key, i) in rowDetails" :key="i">
      <div class="text-weight-bold">{{ key }}</div>
      <div>{{ item || '-' }}</div>
      <br />
    </div>
  </FullscreenDialog>

  <FullscreenDialog
    title="Edit"
    :canSave="true"
    :dialog="editDialog"
    @toggle:fullDialog="editDialog = !editDialog"
    @save:fullDialog="saveEditDialog()"
  >
    <div>Not Implemented</div>
  </FullscreenDialog>

  <ConfirmDialog
    title="Delete"
    :icon="Icon.DELETE"
    :message="`Permanently delete ${selectedRowId} from the '${props.store}' table in the database?`"
    color="negative"
    :dialog="deleteDialog"
    @toggle:dialog="deleteDialog = !deleteDialog"
    @confirm:dialog="confirmDeleteDialog()"
  />
</template>
