<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, DBTable, LogLevel } from '@/constants/enums'
import { type Ref, ref, onMounted } from 'vue'
import { database } from '@/services/LocalDatabase'
import { useMessaging } from '@/use/useMessaging'
import { useTableType } from '@/use/useTableType'
import FullscreenDialog from './dialogs/FullscreenDialog.vue'

const { log, notify, confirmDialog } = useMessaging()
const {
  getTableLabel,
  getTableColumns,
  getTableColumnOptions,
  getTableVisibleColumn,
  isRecordTable,
  isNotAppLogTable,
} = useTableType()

const props = defineProps<{
  table: DBTable
}>()

const searchFilter: Ref<string> = ref('')
const tableName: Ref<string> = ref('')
const tableRows: Ref<any[]> = ref([])
const tableColumns: Ref<any[]> = ref([])
const columnOptions: Ref<any[]> = ref([])
const visibleColumns: Ref<string[]> = ref([])
// Action options
const canCreate: Ref<boolean> = ref(false)
const canEdit: Ref<boolean> = ref(false)
const canReport: Ref<boolean> = ref(false)
// Fullscreen Dialog
const fullItem: Ref<any> = ref({})
const fullTitle: Ref<string> = ref('')
const fullMessage: Ref<string> = ref('')
const fullDialog: Ref<boolean> = ref(false)

onMounted(async () => {
  tableName.value = getTableLabel(props.table)
  tableColumns.value = getTableColumns(props.table)
  columnOptions.value = getTableColumnOptions(props.table)
  visibleColumns.value = getTableVisibleColumn(props.table)
  canCreate.value = isNotAppLogTable(props.table)
  canEdit.value = isNotAppLogTable(props.table)
  canReport.value = isRecordTable(props.table)
  await updateTableRows()
})

async function updateTableRows(): Promise<void> {
  try {
    tableRows.value = await database.getAll(props.table)
  } catch (error) {
    const callerName = 'updateTableRows'
    log({ error, level: LogLevel.ERROR, callerName, details: props.table })
    notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
  }
}

async function updateFullscreenItem(id: string): Promise<any> {
  try {
    fullItem.value = await database.getById(props.table, id)
  } catch (error) {
    const callerName = 'updateFullscreenItem'
    log({ error, level: LogLevel.ERROR, callerName, details: props.table })
    notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
  }
}

function create(): void {
  fullTitle.value = 'Create'
  fullMessage.value = getTableLabel(props.table, false)
  fullDialog.value = true
}

function clear(): void {
  confirmDialog(
    'Clear',
    `Permanently remove all data from the ${tableName.value} table?`,
    async () => {
      try {
        await database.clear(props.table)
      } catch (error) {
        const callerName = 'clear'
        log({ error, level: LogLevel.ERROR, callerName, details: props.table })
        notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
      }
    }
  )
}

async function report(id: string): Promise<void> {
  await updateFullscreenItem(id)
  fullTitle.value = 'Report'
  fullMessage.value = getTableLabel(props.table, false)
  fullDialog.value = true
}

async function details(id: string): Promise<void> {
  await updateFullscreenItem(id)
  fullTitle.value = 'Details'
  fullMessage.value = getTableLabel(props.table, false)
  fullDialog.value = true
}

async function edit(id: string): Promise<void> {
  await updateFullscreenItem(id)
  fullTitle.value = 'Edit'
  fullMessage.value = getTableLabel(props.table, false)
  fullDialog.value = true
}

async function remove(id: string): Promise<void> {
  confirmDialog(
    'Remove',
    `Permanently remove item << ${id} >> from the ${tableName.value} table?`,
    async () => {
      try {
        await database.deleteById(props.table, id)
      } catch (error) {
        const callerName = 'remove'
        log({ error, level: LogLevel.ERROR, callerName, details: `${props.table}:${id}` })
        notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
      }
    }
  )
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
    :visible-columns="visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ tableName }}</div>
      <QSpace />
      <!-- Search Input -->
      <QInput
        outlined
        dense
        debounce="300"
        v-model="searchFilter"
        placeholder="Search"
        class="q-mr-sm q-mb-sm"
      >
        <template v-slot:append>
          <QIcon name="search" />
        </template>
      </QInput>
      <!-- Column Select -->
      <QSelect
        v-model="visibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="columnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <!-- Create Btn -->
        <QBtn
          v-if="canCreate"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="create()"
        />
        <!-- Clear Btn -->
        <QBtn color="negative" label="Clear" @click="clear()" class="q-mb-sm" />
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
          <!-- Report Btn -->
          <QBtn
            v-if="canReport"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            @click="report(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <!-- Details Btn -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="details(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <!-- Edit Btn -->
          <QBtn
            v-if="canEdit"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            @click="edit(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <!-- Delete Btn -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="remove(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Dialogs -->
  <FullscreenDialog
    :title="fullTitle"
    :message="fullMessage"
    :dialog="fullDialog"
    @update:dialog="fullDialog = $event"
  >
    <div>{{ fullItem }}</div>
  </FullscreenDialog>
</template>
