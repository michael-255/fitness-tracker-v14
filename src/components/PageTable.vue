<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, DBTable, LogLevel } from '@/constants/enums'
import { useTable } from '@/use/useTable'
import { type Ref, ref, onMounted } from 'vue'
import CreateMeasurementDialog from '@/components/dialogs/CreateMeasurementDialog.vue'
import EditMeasurementDialog from '@/components/dialogs/EditMeasurementDialog.vue'
import { useQuasar } from 'quasar'
import { useNotify } from '@/use/useNotify'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import { database } from '@/services/LocalDatabase'

const $q = useQuasar()

const { notify } = useNotify($q)
const { confirmDialog } = useSimpleDialogs($q)
const { log } = useLogger()

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
  // selectedRowId,
  createDialog,
  // clearDialog,
  reportDialog,
  detailsDialog,
  editDialog,
  // deleteDialog,
  openCreateDialog,
  saveCreateDialog,
  // openClearDialog,
  // confirmClearDialog,
  openReportDialog,
  openDetailsDialog,
  // openEditDialog,
  saveEditDialog,
  // openDeleteDialog,
  // confirmDeleteDialog,
} = useTable({
  table: props.table,
  tableColumns: props.tableColumns,
  columnOptions: props.columnOptions,
  visibleColumns: props.visibleColumns,
})

const editId: Ref<string> = ref('')
const filter: Ref<string> = ref('')

onMounted(async () => {
  updateTableRows()
})

async function updateTableRows(): Promise<void> {
  try {
    tableRows.value = await database.getAll(props.table)
  } catch (error) {
    const callerName = 'updateTableRows'
    log({ error, level: LogLevel.ERROR, name: callerName, details: props.table })
    notify(`Error with operation: ${callerName}`, Icon.DELETE, 'negative')
  }
}

/**
 * Opens confirm dialog to delete the row item.
 */
function deleteRowAction(id: string) {
  confirmDialog(
    `Delete`,
    `Permanetly delete '${id}' from table '${props.table}' in the database?`,
    async () => {
      try {
        await database.deleteById(props.table, id)
        await updateTableRows()
        notify(`Deleted '${id}' from '${props.table}'`, Icon.DELETE)
      } catch (error) {
        const callerName = 'deleteRowAction'
        log({
          error,
          level: LogLevel.ERROR,
          name: callerName,
          details: `${props.table}:${id}`,
        })
        notify(`Error with operation: ${callerName}`, Icon.DELETE, 'negative')
      }
    }
  )
}

/**
 * Opens confirm dialog to clear the table.
 */
function clearAction() {
  confirmDialog(
    `Clear`,
    `Permanetly delete all data from table '${props.table}' in the database?`,
    async () => {
      try {
        await database.clear(props.table)
        await updateTableRows()
        notify(`Cleared table '${props.table}'`, Icon.DELETE)
      } catch (error) {
        const callerName = 'clearAction'
        log({
          error,
          level: LogLevel.ERROR,
          name: callerName,
          details: props.table,
        })
        notify(`Error with operation: ${callerName}`, Icon.DELETE, 'negative')
      }
    }
  )
}

function canCreate() {
  return (
    props.table === DBTable.MEASUREMENTS ||
    props.table === DBTable.MEASUREMENT_RECORDS ||
    props.table === DBTable.EXERCISES ||
    props.table === DBTable.EXERCISE_RECORDS ||
    props.table === DBTable.WORKOUTS ||
    props.table === DBTable.WORKOUT_RECORDS
  )
}

async function createDialogEvent(event: any): Promise<void> {
  createDialog.value = event
  await updateTableRows()
}

async function editDialogEvent(event: any): Promise<void> {
  editDialog.value = event
  await updateTableRows()
}

async function openEditDialog(id: string): Promise<void> {
  console.log(id)
  editId.value = id
  editDialog.value = true
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
          v-if="canCreate()"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="openCreateDialog()"
        />
        <QBtn color="negative" label="Clear" @click="clearAction()" class="q-mb-sm" />
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
            color="orange-9"
            @click="openEditDialog(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="deleteRowAction(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Dialogs -->
  <CreateMeasurementDialog :dialog="createDialog" @update:dialog="createDialogEvent($event)" />
  <EditMeasurementDialog
    :editId="editId"
    :dialog="editDialog"
    @update:dialog="editDialogEvent($event)"
  />
</template>
