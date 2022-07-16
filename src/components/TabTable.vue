<script setup lang="ts">
import { DialogType, Icon, DBTable, LogLevel } from '@/constants/enums'
import { type Ref, ref, onMounted } from 'vue'
import { database } from '@/services/LocalDatabase'
import { useMessaging } from '@/use/useMessaging'
import { useTableType } from '@/use/useTableType'
import DataTable from './DataTable.vue'
import MeasurementDialog from '@/components/dialogs/MeasurementDialog.vue'
import type { Measurement } from '@/models/Measurement'
import type { MeasurementRecord } from '@/models/MeasurementRecord'

const { log, notify, confirmDialog } = useMessaging()
const { getTableLabel } = useTableType()

const props = defineProps<{
  table: DBTable
}>()

const tableRows: Ref<any[]> = ref([])
const dialogType: Ref<DialogType> = ref(DialogType.DETAILS)
const item: Ref<any> = ref({}) // Database item
const measurementDialog: Ref<boolean> = ref(false)
const measurementRecordDialog: Ref<boolean> = ref(false)

onMounted(async () => {
  await updateTableRows()
})

async function updateTableRows(): Promise<void> {
  try {
    tableRows.value = await database.getAll(props.table)
  } catch (error) {
    const callerName = 'updateTableRows'
    log({ error, level: LogLevel.ERROR, callerName })
    notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
  }
}

async function getReport(id: string): Promise<any> {
  try {
    switch (props.table) {
      case DBTable.MEASUREMENTS:
        console.log(props.table, id)
        break
      case DBTable.MEASUREMENT_RECORDS:
        console.log(props.table, id)
        break
      // TODO
    }
  } catch (error) {
    const callerName = `getReport:${props.table}:${id}`
    log({ error, level: LogLevel.ERROR, callerName })
    notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
  }
}

async function getData(id: string): Promise<void> {
  try {
    switch (props.table) {
      case DBTable.MEASUREMENTS:
        item.value = await database.getById<Measurement>(DBTable.MEASUREMENTS, id)
        break
      case DBTable.MEASUREMENT_RECORDS:
        item.value = await database.getById<MeasurementRecord>(DBTable.MEASUREMENT_RECORDS, id)
        break
      // TODO
    }
  } catch (error) {
    const callerName = `getData:${props.table}:${id}`
    log({ error, level: LogLevel.ERROR, callerName })
    notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
  }
}

function openDialog(): void {
  switch (props.table) {
    case DBTable.MEASUREMENTS:
      measurementDialog.value = true
      break
    case DBTable.MEASUREMENT_RECORDS:
      measurementRecordDialog.value = true
      break
  }
}

async function closeDialog(): Promise<void> {
  measurementDialog.value = false
  measurementRecordDialog.value = false
  await updateTableRows()
  // TODO
}

function onCreate(): void {
  dialogType.value = DialogType.CREATE
  openDialog()
}

async function onClear(): Promise<void> {
  confirmDialog(
    'Clear',
    `Permanently remove all data from the ${getTableLabel(props.table)} table?`,
    async () => {
      try {
        await database.clear(props.table)
        await updateTableRows()
      } catch (error) {
        const callerName = 'clear'
        log({ error, level: LogLevel.ERROR, callerName })
        notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
      }
    }
  )
}

async function onReport(id: string): Promise<void> {
  await getReport(id)
  dialogType.value = DialogType.REPORT
  openDialog()
}

async function onDetails(id: string): Promise<void> {
  await getData(id)
  dialogType.value = DialogType.DETAILS
  openDialog()
}

async function onEdit(id: string): Promise<void> {
  await getData(id)
  dialogType.value = DialogType.EDIT
  openDialog()
}

async function onDelete(id: string): Promise<void> {
  confirmDialog(
    'Remove',
    `Permanently remove item << ${id} >> from the ${getTableLabel(props.table)} table?`,
    async () => {
      try {
        await database.deleteById(props.table, id)
        await updateTableRows()
      } catch (error) {
        const callerName = 'remove'
        log({ error, level: LogLevel.ERROR, callerName })
        notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
      }
    }
  )
}

async function onSaved(): Promise<void> {
  item.value = {}
  closeDialog()
}
</script>

<template>
  <DataTable
    :table="table"
    :rows="tableRows"
    @on-create="onCreate()"
    @on-clear="onClear()"
    @on-report="onReport($event)"
    @on-details="onDetails($event)"
    @on-edit="onEdit($event)"
    @on-delete="onDelete($event)"
  />

  <MeasurementDialog
    :table="table"
    :measurement="item"
    :dialogType="dialogType"
    :dialog="measurementDialog"
    @update:dialog="closeDialog()"
    @saved="onSaved()"
  />
</template>
