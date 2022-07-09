<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, DBTable } from '@/constants/enums'
import { useTable } from '@/use/useTable'
import { type Ref, ref } from 'vue'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
import FullscreenDialog from '@/components/dialogs/FullscreenDialog.vue'
import { useLogger } from '@/use/useLogger'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const { notify } = useLogger()

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

const filter: Ref<string> = ref('')

// function deleteDialog(title: string, message: string) {
//   $q.dialog({ title, message, cancel: true, persistent: true }).onOk(() => {
//     notify('Item has been successfully deleted.')
//   })
// }
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
    :filter="filter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ tableName }}</div>
      <QSpace />
      <QInput
        outlined
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
        class="q-mr-sm q-mb-sm"
      >
        <template v-slot:append>
          <QIcon name="search" />
        </template>
      </QInput>
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
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <QBtn
          v-if="showCreate"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="openCreateDialog()"
        />
        <QBtn color="negative" label="Clear" @click="openClearDialog()" class="q-mb-sm" />
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
            @click="openReportDialog(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="openDetailsDialog(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <QBtn
            v-if="showEdit"
            flat
            round
            dense
            class="q-ml-xs"
            color="warning"
            @click="openEditDialog(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
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
    :message="`Permanently clear all data from the '${props.table}' table in the database?`"
    color="negative"
    :dialog="clearDialog"
    :confirmFunc="confirmClearDialog"
    @update:dialog="clearDialog = $event"
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
    :message="`Permanently delete ${selectedRowId} from the '${table}' table in the database?`"
    color="negative"
    :dialog="deleteDialog"
    :confirmFunc="confirmDeleteDialog"
    @update:dialog="deleteDialog = $event"
  />
</template>
