<script setup lang="ts">
import {
  QBtn,
  QTable,
  QTr,
  QTh,
  QTd,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QBar,
  QSpace,
} from 'quasar'
import { useTable } from '@/use/useTable'
import { Icon, Store } from '@/constants'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const store = Store.APP_LOGS

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
  openClearDialog,
  confirmClearDialog,
  openReportDialog,
  openDetailsDialog,
  openEditDialog,
  openDeleteDialog,
  confirmDeleteDialog,
} = useTable({
  store,
  tableColumns: [
    {
      name: 'id',
      label: 'Id',
      align: 'left',
      required: true,
      field: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'createdAt',
      label: 'Created At',
      align: 'left',
      required: true,
      field: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: 'callerName',
      label: 'Caller Name',
      align: 'left',
      required: true,
      field: (row: any) => row.callerName,
      sortable: true,
    },
    {
      name: 'details',
      label: 'Details',
      align: 'left',
      required: true,
      field: (row: any) => row.details,
      sortable: true,
    },
    {
      name: 'errorName',
      label: 'Error Name',
      align: 'left',
      required: true,
      field: (row: any) => row.errorName,
      sortable: true,
    },
  ],
})
</script>

<template>
  <QTable :rows="tableRows" :columns="tableColumns" :rows-per-page-options="[10]">
    <!-- Table Header -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">App Logs</div>
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

  <!-- Create -->
  <QDialog
    v-model="createDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard class="bg-primary text-white">
      <QBar>
        <div class="text-h6">Create</div>
        <QSpace />
        <QBtn dense flat icon="close" v-close-popup />
      </QBar>

      <QCardSection>
        <div class="text-h6">...</div>
      </QCardSection>
    </QCard>
  </QDialog>

  <!-- Clear -->
  <ConfirmDialog
    title="Clear"
    :icon="Icon.DELETE"
    :message="`Permanently clear all data from the '${store}' table in the database?`"
    color="negative"
    :dialog="clearDialog"
    @toggle:dialog="clearDialog = !clearDialog"
    @confirm:dialog="confirmClearDialog()"
  />

  <!-- Report -->
  <QDialog
    v-model="reportDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard class="bg-primary text-white">
      <QBar>
        <div class="text-h6">Report</div>
        <QSpace />
        <QBtn dense flat icon="close" v-close-popup />
      </QBar>

      <QCardSection>
        <div class="text-h6">...</div>
      </QCardSection>
    </QCard>
  </QDialog>

  <!-- Details -->
  <QDialog
    v-model="detailsDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard class="bg-primary text-white">
      <QBar>
        <div class="text-h6">Details</div>
        <QSpace />
        <QBtn dense flat :icon="Icon.CLOSE" v-close-popup />
      </QBar>

      <QCardSection>
        <!-- Testing extra text for vertical scroll -->
        <div v-for="(item, key, i) in rowDetails" :key="i">
          <div class="text-weight-bold">{{ key }}</div>
          <div>{{ item || '-' }}</div>
          <br />
        </div>
        <div v-for="(item, key, i) in rowDetails" :key="i">
          <div class="text-weight-bold">{{ key }}</div>
          <div>{{ item || '-' }}</div>
          <br />
        </div>
        <div v-for="(item, key, i) in rowDetails" :key="i">
          <div class="text-weight-bold">{{ key }}</div>
          <div>{{ item || '-' }}</div>
          <br />
        </div>
      </QCardSection>

      <QCardActions align="right">
        <QBtn label="Save Changes" color="white text-black" v-close-popup />
      </QCardActions>
    </QCard>
  </QDialog>

  <!-- Edit -->
  <QDialog
    v-model="editDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard class="bg-primary text-white">
      <QBar>
        <div class="text-h6">Edit</div>
        <QSpace />
        <QBtn dense flat icon="close" v-close-popup />
      </QBar>

      <QCardSection>
        <div class="text-h6">...</div>
      </QCardSection>
    </QCard>
  </QDialog>

  <!-- Delete -->
  <ConfirmDialog
    title="Delete"
    :icon="Icon.DELETE"
    :message="`Permanently delete ${selectedRowId} from the '${store}' table in the database?`"
    color="negative"
    :dialog="deleteDialog"
    @toggle:dialog="deleteDialog = !deleteDialog"
    @confirm:dialog="confirmDeleteDialog()"
  />
</template>
