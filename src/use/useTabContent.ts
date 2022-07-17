import {
  DialogType,
  Icon,
  DBTable,
  LogLevel,
  ActivityStatus,
  MeasurementType,
  RecordStatus,
} from '@/constants/enums'
import { type Ref, ref, onMounted } from 'vue'
import { database } from '@/services/LocalDatabase'
import { useMessaging } from '@/use/useMessaging'
import { useTable } from '@/use/useTable'
import { Measurement } from '@/models/Measurement'
import { MeasurementRecord } from '@/models/MeasurementRecord'
import { useMeasurementInputs } from '@/use/useMeasurementInputs'
import { useMeasurementRecordInputs } from '@/use/useMeasurementRecordInputs'

export function useTabContent(table: DBTable) {
  const { setMeasurement, getMeasurement, isMeasurementValid } = useMeasurementInputs()
  const { setMeasurementRecord, getMeasurementRecord, isMeasurementRecordValid } =
    useMeasurementRecordInputs()
  const { log, notify, confirmDialog } = useMessaging()
  const { getTableLabel } = useTable()

  const tableRows: Ref<any[]> = ref([])
  const dialog: Ref<boolean> = ref(false)
  const dialogType: Ref<DialogType> = ref(DialogType.DETAILS)
  const detailsItem: Ref<any> = ref({})
  const selectedId: Ref<string> = ref('')

  onMounted(async () => {
    await updateTableRows()
  })

  async function updateTableRows(): Promise<void> {
    try {
      tableRows.value = await database.getAll(table)
    } catch (error) {
      const callerName = 'updateTableRows'
      log({ error, level: LogLevel.ERROR, callerName })
      notify(`Error with operation: ${callerName}`, Icon.ERROR, 'negative')
    }
  }

  async function updateDialog(event: any): Promise<void> {
    await updateTableRows()
    dialog.value = !!event
  }

  function validationFailed(): void {
    notify('Must correct form validation errors to save', Icon.WARN, 'orange-9')
  }

  const onBehavior: { [x: string]: any } = {
    [DBTable.MEASUREMENTS]: {
      [DialogType.CREATE]: {
        open: () => setMeasurement('', '', '', '', ActivityStatus.ENABLED, MeasurementType.INCHES),
        save: async () => {
          if (isMeasurementValid()) {
            const m = getMeasurement()
            await database.add<Measurement>(
              table,
              new Measurement({
                id: m?.id,
                createdAt: m?.createdAt,
                name: m?.name,
                description: m?.description,
                activityStatus: m?.activityStatus,
                measurementType: m?.measurementType,
              } as Measurement)
            )
            updateDialog(false)
          } else {
            validationFailed()
          }
        },
      },
      [DialogType.REPORT]: {
        open: async (id: string) => {
          const records = await database.getRecordsByParentId(DBTable.MEASUREMENT_RECORDS, id)
          console.log(records)
        },
      },
      [DialogType.DETAILS]: {
        open: async (id: string) => {
          detailsItem.value = await database.getById<Measurement>(table, id)
        },
      },
      [DialogType.EDIT]: {
        open: async (id: string) => {
          selectedId.value = id
          const m = await database.getById<Measurement>(table, id)
          setMeasurement(
            m?.id,
            m?.createdAt,
            m?.name,
            m?.description,
            m?.activityStatus,
            m?.measurementType
          )
        },
        save: async () => {
          if (isMeasurementValid()) {
            const m = getMeasurement()
            await database.updateById<Measurement>(
              table,
              selectedId.value,
              new Measurement({
                id: m?.id,
                createdAt: m?.createdAt,
                name: m?.name,
                description: m?.description,
                activityStatus: m?.activityStatus,
                measurementType: m?.measurementType,
              } as Measurement)
            )
            updateDialog(false)
          } else {
            validationFailed()
          }
        },
      },
    },
    [DBTable.MEASUREMENT_RECORDS]: {
      [DialogType.CREATE]: {
        open: () =>
          setMeasurementRecord(
            '',
            '',
            '',
            '',
            RecordStatus.COMPLETED,
            MeasurementType.INCHES,
            undefined
          ),
        save: async () => {
          if (isMeasurementRecordValid()) {
            const mr = getMeasurementRecord()
            await database.add<MeasurementRecord>(
              table,
              new MeasurementRecord({
                id: mr?.id,
                createdAt: mr?.createdAt,
                parentId: mr?.parentId,
                note: mr?.note,
                recordStatus: mr?.recordStatus,
                parentType: mr?.parentType,
                value: mr?.value,
              } as MeasurementRecord)
            )
            updateDialog(false)
          } else {
            validationFailed()
          }
        },
      },
      [DialogType.DETAILS]: {
        open: async (id: string) => {
          detailsItem.value = await database.getById<MeasurementRecord>(table, id)
        },
      },
      [DialogType.EDIT]: {
        open: async (id: string) => {
          selectedId.value = id
          const mr = await database.getById<MeasurementRecord>(table, id)
          setMeasurementRecord(
            mr?.id,
            mr?.createdAt,
            mr?.parentId,
            mr?.note,
            mr?.recordStatus,
            mr?.parentType,
            mr?.value
          )
        },
        save: async () => {
          if (isMeasurementRecordValid()) {
            const mr = getMeasurementRecord()
            await database.updateById<MeasurementRecord>(
              table,
              selectedId.value,
              new MeasurementRecord({
                id: mr?.id,
                createdAt: mr?.createdAt,
                parentId: mr?.parentId,
                note: mr?.note,
                recordStatus: mr?.recordStatus,
                parentType: mr?.parentType,
                value: mr?.value,
              } as MeasurementRecord)
            )
            updateDialog(false)
          } else {
            validationFailed()
          }
        },
      },
    },
  }

  function onCreate(): void {
    dialogType.value = DialogType.CREATE
    onBehavior[table][dialogType.value].open()
    dialog.value = true
  }

  async function onReport(id: string): Promise<void> {
    dialogType.value = DialogType.REPORT
    onBehavior[table][dialogType.value].open(id)
    dialog.value = true
  }

  async function onDetails(id: string): Promise<void> {
    dialogType.value = DialogType.DETAILS
    onBehavior[table][dialogType.value].open(id)
    dialog.value = true
  }

  async function onEdit(id: string): Promise<void> {
    dialogType.value = DialogType.EDIT
    onBehavior[table][dialogType.value].open(id)
    dialog.value = true
  }

  async function onDelete(id: string): Promise<void> {
    confirmDialog(
      'Delete',
      `Permanently delete item << ${id} >> from the ${getTableLabel(table)} table?`,
      async () => {
        try {
          await database.deleteById(table, id)
          await updateTableRows()
        } catch (error) {
          const callerName = 'onDelete'
          log({ error, level: LogLevel.ERROR, callerName })
          notify(`Error ${callerName}`, Icon.ERROR, 'negative')
        }
      }
    )
  }

  async function onClear(): Promise<void> {
    confirmDialog(
      'Clear',
      `Permanently delete all data from the ${getTableLabel(table)} table?`,
      async () => {
        try {
          await database.clear(table)
          await updateTableRows()
        } catch (error) {
          const callerName = 'onClear'
          log({ error, level: LogLevel.ERROR, callerName })
          notify(`Error ${callerName}`, Icon.ERROR, 'negative')
        }
      }
    )
  }

  async function onSaved(): Promise<void> {
    onBehavior[table][dialogType.value].save()
  }

  return {
    tableRows,
    dialog,
    dialogType,
    detailsItem,
    updateDialog,
    onCreate,
    onReport,
    onDetails,
    onEdit,
    onDelete,
    onClear,
    onSaved,
  }
}
