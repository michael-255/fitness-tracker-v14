<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import {
  Icon,
  DBTable,
  LogLevel,
  ActivityStatus,
  RecordStatus,
  MeasurementType,
} from '@/constants/enums'
import { type Ref, ref, onMounted } from 'vue'
import { database } from '@/services/LocalDatabase'
import { useMessaging } from '@/use/useMessaging'
import { useTableType } from '@/use/useTableType'
import FullscreenDialog from './dialogs/FullscreenDialog.vue'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import EnumSelect from '@/components/inputs/EnumSelect.vue'
import ParentSelect from '@/components/inputs/ParentSelect.vue'

const { log, notify, confirmDialog } = useMessaging()
const {
  isActivityTable,
  isRecordTable,
  getTableLabel,
  getTableColumns,
  getTableColumnOptions,
  getTableVisibleColumn,
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
const fullTitle: Ref<'Create' | 'Report' | 'Details' | 'Edit' | ''> = ref('')
const fullMessage: Ref<string> = ref('')
const fullDialog: Ref<boolean> = ref(false)
// Dialog Inputs
const id: Ref<string> = ref('')
const createdAt: Ref<string> = ref('')
const name: Ref<string> = ref('')
const description: Ref<string> = ref('')
const note: Ref<string> = ref('')
const recordStatus: Ref<RecordStatus> = ref(RecordStatus.COMPLETED)
const measurementType: Ref<MeasurementType> = ref(MeasurementType.INCHES)
const parentType: Ref<MeasurementType> = ref(MeasurementType.INCHES)

const parentId: Ref<string> = ref('')

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

async function save(): Promise<void> {
  const title = fullTitle.value

  if (title === 'Create') {
    console.log('CREATE')
    //
  }
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
    :details="fullItem"
    @update:dialog="fullDialog = $event"
    @save="save()"
  >
    <div v-if="table === DBTable.MEASUREMENTS">
      <IdInput :id="id" @update:id="id = $event" />
      <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />
      <NameInput :name="name" @update:name="name = $event" />
      <TextAreaInput :text="description" label="Description" @update:text="description = $event" />
      <EnumSelect
        label="Measurement Type"
        :value="measurementType"
        @update:value="measurementType = $event"
      />
    </div>

    <div v-else-if="table === DBTable.MEASUREMENT_RECORDS">
      <IdInput :id="id" @update:id="id = $event" />
      <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />
      <ParentSelect
        :parentId="parentId"
        :table="DBTable.MEASUREMENTS"
        @update:parentId="parentId = $event"
      />
      <TextAreaInput :text="note" label="Note" @update:text="note = $event" />
      <EnumSelect
        label="Record Status"
        :value="recordStatus"
        @update:value="recordStatus = $event"
      />
      <EnumSelect
        label="Parent Measurement Type"
        :value="parentType"
        @update:value="parentType = $event"
      />
    </div>
  </FullscreenDialog>
</template>
